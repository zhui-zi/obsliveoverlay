$css = Get-Content -Raw 'src/styles/main.css' -Encoding UTF8
$old = '(?s)body\[data-theme="minimal-light"\] \.minimal-live-button \{.+?body\[data-theme="minimal-light"\] \.minimal-home-link \{.*?z-index: 2;\s*\}'
$new = 'body[data-theme="minimal-light"] .minimal-live-button {
      width: 100%;
      height: 22px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      border: 1px solid rgba(255, 99, 71, 0.4);
      background: rgba(255, 99, 71, 0.1);
      color: rgba(255, 255, 255, 0.9);
      font-family: ''Google Sans'', sans-serif;
      font-weight: 700;
      font-size: 11px;
      letter-spacing: 1px;
      text-transform: uppercase;
      animation: minimal-pulse-live 2s ease-in-out infinite;
      user-select: none;
    }

    body[data-theme="minimal-light"] .minimal-live-button::before {
      content: ''¡ñ'';
      margin-right: 6px;
      font-size: 8px;
      color: #ff4757;
      text-shadow: 0 0 8px rgba(255, 71, 87, 0.8);
    }

    body[data-theme="minimal-light"] .minimal-home-link {
      width: 100%;
      height: 22px;
      padding: 0 8px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.7);
      font-family: ''Google Sans'', sans-serif;
      font-weight: 500;
      font-size: 11px;
      text-decoration: none;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      position: relative;
      z-index: 2;
    }
    
    @keyframes minimal-pulse-live {
      0%, 100% { opacity: 1; border-color: rgba(255, 99, 71, 0.6); box-shadow: 0 0 6px rgba(255, 99, 71, 0.3); }
      50% { opacity: 0.8; border-color: rgba(255, 99, 71, 0.2); box-shadow: 0 0 0 transparent; }
    }'
$css = [regex]::Replace($css, $old, $new)
Set-Content -Path 'src/styles/main.css' -Value $css -Encoding UTF8
