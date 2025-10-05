# 修复 cp/index.html - 添加 theme-manager.js
$file = "gta-map\cp\index.html"
$content = Get-Content $file -Raw -Encoding UTF8
$newContent = $content -replace '(<base href="/gta-map">)', '$1`n    <script src="/src/js/theme-manager.js"></script>'
$newContent | Out-File $file -Encoding UTF8 -NoNewline
Write-Host "✅ 已添加 theme-manager.js 到 $file"
