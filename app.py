import streamlit as st
import pandas as pd

st.set_page_config(page_title="Logic‑String Dashboard", layout="wide")

st.title("📊 Logic‑String Event Dashboard")
st.markdown(
    (
        "Upload a CSV containing your event logs "
        "(columns: DaTiX, idx, subj, obj, stat, slot1…slot5). "
        "The app will compute running **balance** and "
        "**interest** for each row."
    )
)

uploaded = st.file_uploader("Choose a CSV file", type=["csv"])
if uploaded:
    df = pd.read_csv(uploaded)
    st.subheader("Raw data")
    st.dataframe(df, use_container_width=True)

    # --- core pipeline (≈ 25 lines) ---
    def _payment(r, b, i):
        pay_to_int = min(r.slot1, i)
        i -= pay_to_int
        b -= r.slot1 - pay_to_int
        return b, i

    FORMULA = {
        "cash": lambda r, b, i: (b, i),
        "credit": lambda r, b, i: (b + r.slot1 * r.slot2 - r.slot3, i),
        "accrual": lambda r, b, i: (b, i + b * r.slot2 * r.slot1 / 100),
        "payment": _payment,
    }

    def run_pipeline(frame: pd.DataFrame) -> pd.DataFrame:
        bal, intr, out = 0.0, 0.0, []
        for r in frame.itertuples(index=False):
            func = FORMULA.get(getattr(r, "stat"), lambda r, b, i: (b, i))
            bal, intr = func(r, bal, intr)
            out.append((bal, intr))
        frame = frame.copy()
        frame[["balance", "interest"]] = out
        return frame

    result = run_pipeline(df)
    st.subheader("Processed result")
    st.dataframe(result, use_container_width=True)

    csv = result.to_csv(index=False).encode("utf-8")
    st.download_button("Download result CSV", csv, "processed.csv")
