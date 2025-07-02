// Fix for side panel z-index issue and improved toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidePanel = document.getElementById('sidePanel');
    const workspace = document.getElementById('dashboardWorkspace');
    
    // Ensure side panel is always accessible
    sidePanel.style.zIndex = "1500";
    
    // Improved toggle functionality
    document.getElementById('togglePanel').addEventListener('click', function() {
        const panel = document.getElementById('sidePanel');
        panel.classList.toggle('collapsed');
        
        if(panel.classList.contains('collapsed')) {
            panel.style.width = "50px";
            this.textContent = '▶';
        } else {
            panel.style.width = "250px";
            this.textContent = '◀';
        }
    });
    
    // Add multi-directional resize handles to cards
    function addResizeHandlesToCards() {
        document.querySelectorAll('.dashboard-card').forEach(card => {
            // Remove existing resize handle if any
            const existingHandle = card.querySelector('.resize-handle');
            if(existingHandle) existingHandle.remove();
            
            // Create handles for all directions
            const directions = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
            
            directions.forEach(dir => {
                const handle = document.createElement('div');
                handle.className = `resize-handle resize-${dir}`;
                handle.setAttribute('data-direction', dir);
                card.appendChild(handle);
                
                setupResizeHandle(handle, card);
            });
            
            // Add CSS for the handles
            const style = document.createElement('style');
            style.textContent = `
                .resize-handle {
                    position: absolute;
                    background: rgba(107, 138, 253, 0.8);
                    z-index: 1000;
                }
                .resize-n {
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 6px;
                    cursor: n-resize;
                }
                .resize-ne {
                    top: 0;
                    right: 0;
                    width: 10px;
                    height: 10px;
                    cursor: ne-resize;
                }
                .resize-e {
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 6px;
                    height: 20px;
                    cursor: e-resize;
                }
                .resize-se {
                    bottom: 0;
                    right: 0;
                    width: 10px;
                    height: 10px;
                    cursor: se-resize;
                }
                .resize-s {
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 6px;
                    cursor: s-resize;
                }
                .resize-sw {
                    bottom: 0;
                    left: 0;
                    width: 10px;
                    height: 10px;
                    cursor: sw-resize;
                }
                .resize-w {
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 6px;
                    height: 20px;
                    cursor: w-resize;
                }
                .resize-nw {
                    top: 0;
                    left: 0;
                    width: 10px;
                    height: 10px;
                    cursor: nw-resize;
                }
            `;
            document.head.appendChild(style);
        });
    }
    
    // Set up resize functionality for a handle
    function setupResizeHandle(handle, card) {
        handle.addEventListener('mousedown', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const direction = this.getAttribute('data-direction');
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = parseInt(window.getComputedStyle(card).width);
            const startHeight = parseInt(window.getComputedStyle(card).height);
            const startLeft = parseInt(card.style.left) || 0;
            const startTop = parseInt(card.style.top) || 0;
            
            // Bring card to front when resizing
            card.style.zIndex = "1000";
            
            function resize(e) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                
                if (direction.includes('e')) {
                    card.style.width = `${Math.max(300, startWidth + dx)}px`;
                }
                if (direction.includes('s')) {
                    card.style.height = `${Math.max(200, startHeight + dy)}px`;
                }
                if (direction.includes('w')) {
                    const newWidth = Math.max(300, startWidth - dx);
                    card.style.width = `${newWidth}px`;
                    card.style.left = `${startLeft + startWidth - newWidth}px`;
                }
                if (direction.includes('n')) {
                    const newHeight = Math.max(200, startHeight - dy);
                    card.style.height = `${newHeight}px`;
                    card.style.top = `${startTop + startHeight - newHeight}px`;
                }
                
                // Update chart if present
                const cardId = card.id;
                if (window.dashboardManager) {
                    const cardInfo = window.dashboardManager.cards.find(c => c.id === cardId);
                    if (cardInfo && cardInfo.chartType) {
                        setTimeout(() => {
                            window.dashboardManager.createChart(cardInfo);
                        }, 0);
                    }
                }
            }
            
            function stopResize() {
                document.removeEventListener('mousemove', resize);
                document.removeEventListener('mouseup', stopResize);
            }
            
            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
        });
    }
    
    // Improved card selection for stacking
    function improveCardSelection() {
        // Add checkbox selection system
        document.querySelectorAll('#stackCardList input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // Allow multi-selection with clearer visual feedback
                this.parentElement.style.backgroundColor = this.checked ? 
                    'rgba(107, 138, 253, 0.2)' : '';
            });
        });
        
        // Make sure at least two cards must be selected
        document.getElementById('confirmStackBtn').addEventListener('click', function() {
            const selectedCount = document.querySelectorAll('#stackCardList input:checked').length;
            if (selectedCount < 2) {
                alert('กรุณาเลือกการ์ดอย่างน้อย 2 การ์ด');
                return false;
            }
        });
    }
    
    // Add currency formatting
    window.formatCurrency = function(value, currency = 'THB') {
        const currencySymbols = {
            'THB': '฿',
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'JPY': '¥',
            'CNY': '¥',
            'KRW': '₩',
        };
        
        const symbol = currencySymbols[currency] || '';
        
        // Format number based on currency
        return new Intl.NumberFormat('th-TH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value) + ' ' + symbol;
    };
    
    // Fix z-index for stacked cards - active card on top
    function fixCardStacking() {
        document.querySelectorAll('.dashboard-card').forEach(card => {
            card.addEventListener('mousedown', function() {
                // When clicking a card, bring it to the front
                const highestZ = Math.max(
                    ...Array.from(document.querySelectorAll('.dashboard-card'))
                    .map(c => parseInt(window.getComputedStyle(c).zIndex) || 0)
                );
                this.style.zIndex = highestZ + 1;
            });
        });
    }
    
    // Run all fixes
    addResizeHandlesToCards();
    improveCardSelection();
    fixCardStacking();
});
