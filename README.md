# Personal-accounting-System
利用 Python Flask、SQLite 與 Chart.js 打造的淺綠風格個人收支管理系統，提供動態收支統計、分類圓餅圖分析與每月預算超支即時提醒。
# Personal Accounting System (個人收支管理系統)

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0.0-000000?style=for-the-badge&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-4.x-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

輕量化、全棧開發的個人財務管理系統。採用 **Python Flask** 作為輕量後端 API、SQLite 負責資料儲存，前端則整合Chart.js實現動態數據視覺化。全站介面以經典海洋主題色彩（水藍、蒂芬妮綠、章魚粉告警色）精心設計，適合用於技術作品集展示與個人日常記帳。

---
#💡 專案亮點與特色

* **📊 全動態財務 Dashboard**：自動計算並即時呈現當月總收入、總支出與結餘。
* **📈 支出分類視覺化 (Chart.js)**：自動歸納當月各項支出類別，以甜甜圈圖（Doughnut Chart）動態渲染比例。
* **⚠️ 預算控管與超支預警系統**：支援每月預算彈性設定與即時進度條渲染，當月總支出超出預算時，自動觸發粉紅色高亮告警 Banner。
* **🗓️ 跨月份查詢與歷史明細管理**：靈活切換不同年份與月份，支援即時新增與單筆刪除紀錄。
* **🎨 人魚漢頓視覺語彙**：嚴選主題配色與卡片式響應式 UI，兼具專業功能與視覺親和力。

---
#🛠️ 技術棧與工具 

# 後端 (Backend)
* Python 3.x
* Flask 3.0.0：提供 RESTful API 路由服務與 HTML 樣板渲染
* QLite 3：內建輕量型關聯式資料庫

# 前端 (Frontend)
* HTML5 / CSS3：採用 CSS Variables 定義經典海洋主題色系，響應式網頁佈局 (Flexbox & Grid)
* JavaScript (ES6+)：利用 原生 Fetch API 實現前後端非同步資料交換
* Chart.js：動態繪製圖表與數據轉譯

---
# 📂 專案目錄結構 (Project Architecture)

`text
Personal-accounting-System/
├── app.py                  # Flask 主程式：核心 API 路由與控制器邏輯
├── database.py             # 資料庫連線管理與 Schema 初始化腳本
├── requirements.txt        # Python 套件依賴清單
├── README.md               # 專案說明文件
├── .gitignore              # Git 版本控制忽略設定檔
│
├── static/                 # 靜態資源目錄
│   ├── css/
│   │   └── style.css       # 人魚漢頓主題樣式與 UI 元件設計
│   └── js/
│       └── main.js         # 前端互動邏輯與 Chart.js 動態渲染
│
└── templates/              # HTML 樣板目錄
    └── index.html          # 主頁面使用者介面 (UI)
