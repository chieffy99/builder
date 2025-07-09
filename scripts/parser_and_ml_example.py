import re
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier


# ตัวอย่างฟังก์ชัน parse ไฟล์ text กึ่งโครงสร้าง
def parse_custom_text_file(file_path):
    data_rows = []
    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            # ตัวอย่าง: หา pattern ที่ระบุวันที่, รหัส StatC หรือ slotN
            # คุณอาจเปลี่ยน regex หรือการ split ตามโครงสร้างไฟล์จริง
            if line.startswith("date,"):
                # ข้าม header หรือบันทึก header ค่าอื่นได้
                continue
            elif line:
                # สมมติ split ด้วยเครื่องหมายจุลภาค หรือใช้ regex ก็ได้
                fields = re.split(r",", line)
                if len(fields) >= 6:
                    # เก็บข้อมูลเป็น list หรือ dict เช่น
                    dateime_value = fields[0]
                    id1_value = fields[1]
                    id2_value = fields[2]
                    statn_value = fields[3]
                    statc_value = fields[4]
                    slotn_value = fields[5]
                    # เก็บค่าอื่นตามต้องการ...
                    data_rows.append(
                        [
                            dateime_value,
                            id1_value,
                            id2_value,
                            statn_value,
                            statc_value,
                            slotn_value,
                        ]
                    )
    return data_rows


def main():
    # parse ไฟล์ตัวอย่าง
    file_path = "my_custom_file.txt"
    rows = parse_custom_text_file(file_path)

    # สร้าง DataFrame
    df = pd.DataFrame(rows, columns=["date", "ID1", "ID2", "StatN", "StatC", "SlotN"])  # pyright: ignore[reportArgumentType]

    # สมมติจะเทรนโมเดลเล็ก ๆ ทำนาย StatN ว่าจะเป็น 0 หรือ 1
    # แปลงข้อมูลเป็น numeric แบบง่าย ๆ
    df["StatN"] = df["StatN"].astype(int)
    df["SlotN"] = df["SlotN"].astype(int)

    # เลือก features และ label
    X = df[["SlotN"]]  # ตัวอย่างแค่ 1 column
    y = df["StatN"]

    # train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # train RandomForest
    clf = RandomForestClassifier()
    clf.fit(X_train, y_train)

    # ทำนาย
    y_pred = clf.predict(X_test)
    accuracy = (y_pred == y_test).mean()
    print(f"Accuracy: {accuracy:.2f}")


if __name__ == "__main__":
    main()
