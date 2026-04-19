$content = Get-Content -Raw 'overlay.html' -Encoding UTF8
$content = [regex]::Replace($content, '<div class=\"frame-decor ps-decor.*lc\">.*?</div>', '<div class="frame-decor ps-decor decor-tl">&#9651;</div>
        <div class="frame-decor ps-decor decor-tc">&#9675;</div>
        <div class="frame-decor ps-decor decor-tr">&#215;</div>
        <div class="frame-decor ps-decor decor-rc">&#9633;</div>
        <div class="frame-decor ps-decor decor-bl">&#9675;</div>
        <div class="frame-decor ps-decor decor-bc">&#215;</div>
        <div class="frame-decor ps-decor decor-br">&#9633;</div>
        <div class="frame-decor ps-decor decor-lc">&#9651;</div>')
Set-Content -Path 'overlay.html' -Value $content -Encoding UTF8
