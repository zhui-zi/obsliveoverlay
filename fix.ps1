$lines = Get-Content 'overlay.html' -Encoding UTF8
$lines[48] = '        <!--  -->'
$lines[49] = '        <div class=\"frame-decor ps-decor decor-tl\">&#9651;</div>'
$lines[50] = '        <div class=\"frame-decor ps-decor decor-tc\">&#9675;</div>'
$lines[51] = '        <div class=\"frame-decor ps-decor decor-tr\">&#215;</div>'
$lines[52] = '        <div class=\"frame-decor ps-decor decor-rc\">&#9633;</div>'
$lines[53] = '        <div class=\"frame-decor ps-decor decor-bl\">&#9675;</div>'
$lines[54] = '        <div class=\"frame-decor ps-decor decor-bc\">&#215;</div>'
$lines[55] = '        <div class=\"frame-decor ps-decor decor-br\">&#9633;</div>'
$lines[56] = '        <div class=\"frame-decor ps-decor decor-lc\">&#9651;</div>'
Set-Content 'overlay.html' -Value $lines -Encoding UTF8
