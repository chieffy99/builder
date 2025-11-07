(function (global) {
    class UnifiedEventBus {
        constructor(root = document) {
            this.root = root;
            this.document = root.ownerDocument || document;

            this.dragConfigs = new Set();
            this.resizeConfigs = new Set();
            this.hoverConfigs = new Set();

            this.keyboardBindings = new Map();
            this.sessions = new Map();

            this.focusTarget = null;
            this.keyboardSession = null;

            this.channelListeners = new Map();
            this.channelHandlers = new Map();
            this.eventselect = new Proxy(
                {},
                {
                    get: (_, name) => {
                        if (!this.channelHandlers.has(name)) {
                            this.channelHandlers.set(name, (event, payload) => {
                                this._emit(name, { event, payload });
                            });
                        }
                        return this.channelHandlers.get(name);
                    }
                }
            );
            this.eventselcet = this.eventselect;

            this._handlePointerDown = this._handlePointerDown.bind(this);
            this._handlePointerMove = this._handlePointerMove.bind(this);
            this._handlePointerUp = this._handlePointerUp.bind(this);
            this._handlePointerEnter = this._handlePointerEnter.bind(this);
            this._handlePointerLeave = this._handlePointerLeave.bind(this);
            this._handleKeyDown = this._handleKeyDown.bind(this);
            this._handleKeyUp = this._handleKeyUp.bind(this);
            this._handleFocusIn = this._handleFocusIn.bind(this);
            this._handleFocusOut = this._handleFocusOut.bind(this);

            this.root.addEventListener('pointerdown', this._handlePointerDown, true);
            this.root.addEventListener('pointermove', this._handlePointerMove, true);
            this.root.addEventListener('pointerup', this._handlePointerUp, true);
            this.root.addEventListener('pointercancel', this._handlePointerUp, true);
            this.root.addEventListener('pointerenter', this._handlePointerEnter, true);
            this.root.addEventListener('pointerleave', this._handlePointerLeave, true);

            this.document.addEventListener('keydown', this._handleKeyDown, true);
            this.document.addEventListener('keyup', this._handleKeyUp, true);
            this.document.addEventListener('focusin', this._handleFocusIn, true);
            this.document.addEventListener('focusout', this._handleFocusOut, true);
        }

        destroy() {
            this.root.removeEventListener('pointerdown', this._handlePointerDown, true);
            this.root.removeEventListener('pointermove', this._handlePointerMove, true);
            this.root.removeEventListener('pointerup', this._handlePointerUp, true);
            this.root.removeEventListener('pointercancel', this._handlePointerUp, true);
            this.root.removeEventListener('pointerenter', this._handlePointerEnter, true);
            this.root.removeEventListener('pointerleave', this._handlePointerLeave, true);

            this.document.removeEventListener('keydown', this._handleKeyDown, true);
            this.document.removeEventListener('keyup', this._handleKeyUp, true);
            this.document.removeEventListener('focusin', this._handleFocusIn, true);
            this.document.removeEventListener('focusout', this._handleFocusOut, true);

            this.dragConfigs.clear();
            this.resizeConfigs.clear();
            this.hoverConfigs.clear();
            this.keyboardBindings.clear();
            this.sessions.clear();
            this.channelListeners.clear();
            this.channelHandlers.clear();
            this.focusTarget = null;
            this.keyboardSession = null;
        }

        subscribe(channel, listener) {
            if (!this.channelListeners.has(channel)) {
                this.channelListeners.set(channel, new Set());
            }
            const listeners = this.channelListeners.get(channel);
            listeners.add(listener);
            return () => listeners.delete(listener);
        }

        registerDraggable(element, options = {}) {
            const config = this._buildConfig('drag', element, options);
            this.dragConfigs.add(config);
            this._wireKeyboardBinding(element, 'drag', config);
            return () => {
                this.dragConfigs.delete(config);
                this._clearKeyboardBinding(element, 'drag', config);
            };
        }

        registerResizable(element, options = {}) {
            const config = this._buildConfig('resize', element, options);
            this.resizeConfigs.add(config);
            this._wireKeyboardBinding(element, 'resize', config);
            return () => {
                this.resizeConfigs.delete(config);
                this._clearKeyboardBinding(element, 'resize', config);
            };
        }

        registerHover(element, options = {}) {
            const config = {
                element,
                type: 'hover',
                onEnter: options.onEnter,
                onMove: options.onMove,
                onLeave: options.onLeave
            };
            this.hoverConfigs.add(config);
            return () => this.hoverConfigs.delete(config);
        }

        _handlePointerDown(event) {
            const resizeConfig = this._matchConfig(this.resizeConfigs, event);
            const dragConfig = resizeConfig ? null : this._matchConfig(this.dragConfigs, event);
            const config = resizeConfig || dragConfig;

            if (!config) {
                this._emit('pointerdown', { event });
                return;
            }

            const mode = resizeConfig ? 'resize' : 'drag';
            const data = typeof config.onStart === 'function' ? config.onStart(event) || {} : {};

            const session = {
                pointerId: event.pointerId,
                mode,
                config,
                element: config.element,
                startX: event.clientX,
                startY: event.clientY,
                data,
                origin: config.origin || 'corner',
                pointerType: event.pointerType,
                lastX: event.clientX,
                lastY: event.clientY,
                lockSeed: typeof config.lockState === 'function' ? !!config.lockState(event, data) : !!event.shiftKey
            };

            this.sessions.set(event.pointerId, session);
            this._emit('eventdown', { event, session });

            if (typeof config.onActive === 'function') {
                config.onActive(event, session);
            }
        }

        _handlePointerMove(event) {
            const session = this.sessions.get(event.pointerId);
            if (!session) {
                this._emit('pointermove', { event });
                this._dispatchHoverMove(event);
                return;
            }

            const dx = event.clientX - session.startX;
            const dy = event.clientY - session.startY;
            const lockScale = this._resolveLock(session, event);

            const payload = {
                event,
                data: session.data,
                dx,
                dy,
                pointerType: session.pointerType,
                lockScale,
                origin: session.origin
            };

            if (session.mode === 'drag') {
                this._emit('drag', { event, session, dx, dy, lockScale });
                if (typeof session.config.onMove === 'function') {
                    session.config.onMove(event, {
                        data: session.data,
                        dx,
                        dy,
                        lockScale,
                        pointerType: session.pointerType
                    });
                }
            } else if (session.mode === 'resize') {
                this._emit('resize', { event, session, dx, dy, lockScale, origin: session.origin });
                if (typeof session.config.onMove === 'function') {
                    session.config.onMove(event, {
                        data: session.data,
                        dx,
                        dy,
                        lockScale,
                        origin: session.origin,
                        pointerType: session.pointerType
                    });
                }
            }

            session.lastX = event.clientX;
            session.lastY = event.clientY;
            this._dispatchHoverMove(event);
        }

        _handlePointerUp(event) {
            const session = this.sessions.get(event.pointerId);
            if (session) {
                const dx = event.clientX - session.startX;
                const dy = event.clientY - session.startY;
                const lockScale = this._resolveLock(session, event);

                if (typeof session.config.onEnd === 'function') {
                    session.config.onEnd(event, {
                        data: session.data,
                        dx,
                        dy,
                        lockScale
                    });
                }

                this._emit('eventend', { event, session, dx, dy, lockScale });
                this.sessions.delete(event.pointerId);
            } else {
                this._emit(event.type, { event });
            }
        }

        _handlePointerEnter(event) {
            this._emit('pointerenter', { event });
            for (const config of this.hoverConfigs) {
                if (!config.element.contains(event.target)) {
                    continue;
                }
                if (typeof config.onEnter === 'function') {
                    config.onEnter(event);
                }
            }
        }

        _handlePointerLeave(event) {
            this._emit('pointerleave', { event });
            for (const config of this.hoverConfigs) {
                if (!config.element.contains(event.target)) {
                    continue;
                }
                if (typeof config.onLeave === 'function') {
                    config.onLeave(event);
                }
            }
        }

        _dispatchHoverMove(event) {
            for (const config of this.hoverConfigs) {
                if (!config.element.contains(event.target)) {
                    continue;
                }
                if (typeof config.onMove === 'function') {
                    config.onMove(event);
                }
            }
        }

        _handleKeyDown(event) {
            if (!this.focusTarget) {
                return;
            }

            if (!this._isArrowKey(event.key)) {
                return;
            }

            const mode = event.ctrlKey ? 'resize' : 'drag';
            const bindings = this.keyboardBindings.get(this.focusTarget);
            const config = bindings ? bindings[mode] : null;
            if (!config) {
                return;
            }

            if (this.keyboardSession && (this.keyboardSession.mode !== mode || this.keyboardSession.config !== config)) {
                this._finishKeyboardSession(event);
            }

            if (!this.keyboardSession) {
                const data = typeof config.onStart === 'function' ? config.onStart(event) || {} : {};
                this.keyboardSession = {
                    mode,
                    config,
                    element: config.element,
                    data,
                    totalDx: 0,
                    totalDy: 0
                };
                this._emit('eventdown', { event, session: this.keyboardSession });
            }

            const step = typeof config.keyboardStep === 'number' ? config.keyboardStep : 10;
            const delta = this._keyboardDelta(event.key, step);
            if (!delta) {
                return;
            }

            this.keyboardSession.totalDx += delta.dx;
            this.keyboardSession.totalDy += delta.dy;
            const lockScale = typeof config.lockState === 'function'
                ? !!config.lockState(event, this.keyboardSession.data)
                : !!event.shiftKey;

            if (typeof config.onMove === 'function') {
                config.onMove(event, {
                    data: this.keyboardSession.data,
                    dx: this.keyboardSession.totalDx,
                    dy: this.keyboardSession.totalDy,
                    lockScale,
                    origin: config.origin || 'corner',
                    pointerType: 'keyboard'
                });
            }

            if (mode === 'drag') {
                this._emit('drag', {
                    event,
                    session: this.keyboardSession,
                    dx: this.keyboardSession.totalDx,
                    dy: this.keyboardSession.totalDy,
                    lockScale
                });
            } else {
                this._emit('resize', {
                    event,
                    session: this.keyboardSession,
                    dx: this.keyboardSession.totalDx,
                    dy: this.keyboardSession.totalDy,
                    lockScale,
                    origin: config.origin || 'corner'
                });
            }

            event.preventDefault();
        }

        _handleKeyUp(event) {
            if (!this._isArrowKey(event.key)) {
                return;
            }
            this._finishKeyboardSession(event);
        }

        _handleFocusIn(event) {
            this.focusTarget = event.target;
        }

        _handleFocusOut() {
            this.focusTarget = null;
            this._finishKeyboardSession();
        }

        _finishKeyboardSession(event) {
            if (!this.keyboardSession) {
                return;
            }

            if (typeof this.keyboardSession.config.onEnd === 'function') {
                this.keyboardSession.config.onEnd(event || null, {
                    data: this.keyboardSession.data,
                    dx: this.keyboardSession.totalDx,
                    dy: this.keyboardSession.totalDy,
                    lockScale: false
                });
            }

            this._emit('eventend', {
                event: event || null,
                session: this.keyboardSession,
                dx: this.keyboardSession.totalDx,
                dy: this.keyboardSession.totalDy,
                lockScale: false
            });

            this.keyboardSession = null;
        }

        _matchConfig(configs, event) {
            for (const config of configs) {
                if (!config.element.contains(event.target)) {
                    continue;
                }

                if (config.handle && !config.handle.contains(event.target)) {
                    continue;
                }

                if (typeof config.canStart === 'function' && !config.canStart(event)) {
                    continue;
                }

                return config;
            }
            return null;
        }

        _buildConfig(type, element, options) {
            const config = {
                type,
                element,
                handle: options.handle || element,
                canStart: options.canStart,
                onStart: options.onStart,
                onMove: options.onMove,
                onEnd: options.onEnd,
                onActive: options.onActive,
                keyboardStep: options.keyboardStep,
                lockState: options.lockState,
                origin: options.origin || 'corner'
            };
            return config;
        }

        _wireKeyboardBinding(element, mode, config) {
            if (!this.keyboardBindings.has(element)) {
                this.keyboardBindings.set(element, {});
            }
            const bindings = this.keyboardBindings.get(element);
            bindings[mode] = config;
        }

        _clearKeyboardBinding(element, mode, config) {
            const bindings = this.keyboardBindings.get(element);
            if (!bindings) {
                return;
            }
            if (bindings[mode] === config) {
                delete bindings[mode];
            }
            if (!bindings.drag && !bindings.resize) {
                this.keyboardBindings.delete(element);
            }
        }

        _resolveLock(session, event) {
            if (session.pointerType === 'keyboard') {
                return false;
            }
            if (typeof session.config.lockState === 'function') {
                return !!session.config.lockState(event, session.data);
            }
            if (event) {
                return !!event.shiftKey || session.lockSeed;
            }
            return session.lockSeed;
        }

        _keyboardDelta(key, step) {
            switch (key) {
                case 'ArrowLeft':
                    return { dx: -step, dy: 0 };
                case 'ArrowRight':
                    return { dx: step, dy: 0 };
                case 'ArrowUp':
                    return { dx: 0, dy: -step };
                case 'ArrowDown':
                    return { dx: 0, dy: step };
                default:
                    return null;
            }
        }

        _isArrowKey(key) {
            return key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown';
        }

        _emit(channel, payload) {
            const listeners = this.channelListeners.get(channel);
            if (!listeners || listeners.size === 0) {
                return;
            }
            for (const listener of listeners) {
                listener(payload);
            }
        }
    }

    global.UnifiedEventBus = UnifiedEventBus;
})(typeof window !== 'undefined' ? window : this);
