# 官方網站專案

這個專案是使用 Java 8 和 Spring Boot 製作的官方網站，程式碼使用 GitHub 控管，並且使用 GitHub Actions 進行程式的自動部署到 Fly.io（免費空間）。

## 專案結構

- `main` 分支：程式的主要分支，將最終的改動放入此分支會觸發自動化部署。
- `github_action` 分支：修正 GitHub Actions 自動化部署設定。
- `calendar-hotfix` 分支：修正行事曆的輪播元件顯示問題。

## 使用工具

- **JDK 8** - Java
- **IntelliJ IDEA (免費版)**
- **Git** - 版本控制工具

## 環境配置

1. 安裝 [JDK 8](https://www.oracle.com/java/technologies/javase-jdk8-downloads.html)
2. 安裝 [IntelliJ IDEA (免費版)](https://www.jetbrains.com/idea/download/)
3. 安裝 [Git](https://git-scm.com/)

## 克隆專案

1. 打開 IntelliJ IDEA，選擇 `Check out from Version Control` > `Git`。
2. 輸入專案的 GitHub URL，並選擇一個本地存放位置。
3. 點擊 `Clone` 按鈕來克隆程式庫。

## 導入專案

1. 克隆完成後，IntelliJ IDEA 會自動提示你是否要打開專案。選擇 `Yes`。
2. 如果沒有自動提示，選擇 `File` > `Open`，然後導航到克隆的專案目錄並選擇該目錄。
3. IntelliJ IDEA 會自動檢測並配置專案（包括下載和配置所有依賴項）。

## Fetch 特定遠端分支

1. 打開 IntelliJ IDEA，選擇 `Git` 視窗（右下角）。
2. 點擊 `Fetch` 來更新所有遠端分支資訊。
3. 選擇你需要的分支，例如 `calendar-hotfix`。
    - 點擊右下角的分支名稱，選擇 `Checkout from Remote`。
    - 選擇要 fetch 的遠端分支，例如 `origin/calendar-hotfix`，然後點擊 `Checkout`。

## 編寫和提交程式碼

1. 在 IntelliJ IDEA 中開發和測試你的程式碼。
2. 完成後，點擊右上角的 `Git` 圖示並選擇 `Commit`。
3. 填寫提交訊息，描述這次提交的內容。
4. 點擊 `Commit and Push`，將你的更改提交並推送到遠端儲存庫。

## 運行 Spring Boot 應用程式

1. 打開專案後，找到主應用程式類（通常位於 `src/main/java` 目錄下，類名通常以 `Application` 結尾）。
2. 右鍵點擊主應用程式類，選擇 `Run '類名.main()'`。
3. IntelliJ IDEA 會編譯並運行你的 Spring Boot 應用程式，控制台會顯示應用程式啟動日誌。
4. 應用程式啟動後，打開瀏覽器並輸入 `http://localhost:8080` 來訪問你的 Spring Boot 網頁應用程式。

## 維護 Thymeleaf 網頁內容

1. 在專案的 `src/main/resources/templates` 目錄下，你可以找到所有的 Thymeleaf 模板文件（通常是 `.html` 文件）。
2. 使用 IntelliJ IDEA 打開並編輯這些文件，修改頁面內容以符合需求。
3. 保存文件後，刷新瀏覽器查看修改結果。由於 Spring Boot 預設支援熱部署，你的更改應該會自動反映在本地運行的應用程式中。

## 聯絡我們

如有任何問題或需要幫助，請聯絡專案負責人或提交 [GitHub Issues]([https://github.com/your-repo/issues](https://github.com/iEnglishClub-tw/officialWebsite/issues))。
