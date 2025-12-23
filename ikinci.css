:root{
  --bg1:#06112a;
  --bg2:#081b3f;
  --bg3:#0b2a66;

  --card1: rgba(11,23,53,.86);
  --card2: rgba(8,15,35,.80);

  --text:#eaf1ff;
  --muted:#b9c6e6;
  --stroke:rgba(255,255,255,.10);
  --shadow: 0 20px 70px rgba(0,0,0,.55);
  --radius: 22px;

  --pink:#ff6b8a;
  --mint:#8bffda;
  --blue:#7aa7ff;

  --cakeA:#6e4cff;
  --cakeB:#3c2aa8;
  --cream:#f3f7ff;
}

*{ box-sizing:border-box; }
html,body{ height:100%; }
body{
  margin:0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
  color:var(--text);
  background:
    radial-gradient(1100px 700px at 20% 15%, var(--bg3), transparent 55%),
    radial-gradient(900px 600px at 85% 75%, #0a2c5c, transparent 55%),
    linear-gradient(160deg, var(--bg1), var(--bg2));
  overflow:hidden;
}

/* BG */
.bg{ position:fixed; inset:0; pointer-events:none; }
.glow{
  position:absolute;
  width:520px; height:520px;
  border-radius:50%;
  mix-blend-mode:screen;
  animation: floaty 10s ease-in-out infinite;
}
.glow.g1{ top:-140px; left:-120px; background: radial-gradient(circle at 30% 30%, rgba(122,167,255,.55), transparent 60%); }
.glow.g2{ top:40%; left:70%; width:620px; height:620px; background: radial-gradient(circle at 35% 35%, rgba(139,255,218,.30), transparent 62%); animation-duration: 12s; }
.glow.g3{ top:65%; left:10%; width:420px; height:420px; background: radial-gradient(circle at 40% 40%, rgba(255,107,138,.20), transparent 62%); animation-duration: 14s; }
@keyframes floaty{
  0%,100%{ transform: translate(0,0) scale(1); opacity:.9; }
  50%{ transform: translate(25px, -18px) scale(1.04); opacity:.75; }
}

/* Layout */
.wrap{ height:100%; display:grid; place-items:center; padding:16px; }
.card{
  width:min(860px, 94vw);
  max-height: 92vh;
  padding: clamp(16px, 3.2vh, 34px) clamp(14px, 2.6vw, 28px);
  border:1px solid var(--stroke);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  background: linear-gradient(180deg, var(--card1), var(--card2));
  backdrop-filter: blur(10px);
}

.top{ text-align:center; }
.title{ margin:0 0 6px; font-size: clamp(22px, 3.4vw, 34px); }
.sub{ margin:0; color:var(--muted); font-size: 13px; }

/* Stage */
.stage{
  margin-top: 18px;
  display:grid;
  place-items:center;
  position:relative;
  padding: 12px 0 6px;
}
.cakeShadow{
  width:min(520px, 92vw);
  height: 26px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(0,0,0,.55), transparent 70%);
  filter: blur(8px);
  opacity:.55;
  transform: translateY(165px);
}

/* Cake */
.cake{
  width: min(520px, 92vw);
  height: 340px;
  position:relative;
}
.plate{
  position:absolute;
  bottom: 16px;
  left:50%;
  transform: translateX(-50%);
  width: 84%;
  height: 18px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(255,255,255,.18), rgba(255,255,255,.06));
  border:1px solid rgba(255,255,255,.14);
  box-shadow: 0 18px 50px rgba(0,0,0,.45);
}

.tier{
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  border-radius: 20px;
  border:1px solid rgba(255,255,255,.12);
  box-shadow: 0 18px 50px rgba(0,0,0,.42);
}
.tierBot{
  bottom: 28px;
  width: 78%;
  height: 108px;
  background: linear-gradient(180deg, rgba(110,76,255,.95), rgba(60,42,168,.95));
}
.tierMid{
  bottom: 118px;
  width: 62%;
  height: 92px;
  background:
    linear-gradient(180deg, rgba(139,255,218,.22), rgba(122,167,255,.18)),
    linear-gradient(180deg, rgba(110,76,255,.9), rgba(60,42,168,.9));
  background-blend-mode: screen, normal;
}
.tierTop{
  bottom: 196px;
  width: 46%;
  height: 78px;
  background:
    linear-gradient(180deg, rgba(255,107,138,.22), rgba(139,255,218,.14)),
    linear-gradient(180deg, rgba(110,76,255,.88), rgba(60,42,168,.88));
  background-blend-mode: screen, normal;
}

.topFrost{
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  bottom: 256px;
  width: 46%;
  height: 30px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(243,247,255,.98), rgba(243,247,255,.55));
  box-shadow: 0 14px 30px rgba(0,0,0,.25);
  border:1px solid rgba(255,255,255,.14);
}

.drips{
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  bottom: 234px;
  width: 46%;
  height: 60px;
  pointer-events:none;
}
.drips::before{
  content:"";
  position:absolute;
  inset:0;
  background:
    radial-gradient(circle at 10% 0%, rgba(243,247,255,.85) 0 18px, transparent 19px),
    radial-gradient(circle at 30% 0%, rgba(243,247,255,.78) 0 14px, transparent 15px),
    radial-gradient(circle at 55% 0%, rgba(243,247,255,.88) 0 20px, transparent 21px),
    radial-gradient(circle at 75% 0%, rgba(243,247,255,.72) 0 12px, transparent 13px),
    radial-gradient(circle at 92% 0%, rgba(243,247,255,.82) 0 16px, transparent 17px);
  filter: drop-shadow(0 10px 10px rgba(0,0,0,.18));
  opacity:.95;
}

.sprinkles{
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  bottom: 262px;
  width: 44%;
  height: 26px;
  background:
    linear-gradient(15deg, rgba(255,107,138,.9) 0 6px, transparent 6px 14px, rgba(139,255,218,.95) 14px 20px, transparent 20px 28px, rgba(122,167,255,.95) 28px 34px, transparent 34px 42px) 0 0/48px 24px,
    linear-gradient(-20deg, rgba(255,255,255,.9) 0 4px, transparent 4px 10px, rgba(255,107,138,.85) 10px 16px, transparent 16px 24px) 18px 6px/44px 22px;
  opacity:.75;
  border-radius: 999px;
}

/* Candles */
.candles{
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  bottom: 260px;
  width: 46%;
  height: 90px;
}
.candle{
  position:absolute;
  left: var(--x);
  bottom: 0;
  transform: translateX(-50%);
  width: 16px;
  height: 60px;
  filter: drop-shadow(0 12px 18px rgba(0,0,0,.35));
}
.cBody{
  position:absolute;
  inset:0;
  border-radius: 10px;
  border:1px solid rgba(255,255,255,.18);
  background:
    repeating-linear-gradient(135deg,
      rgba(255,255,255,.78) 0 6px,
      rgba(122,167,255,.38) 6px 12px,
      rgba(255,107,138,.32) 12px 18px);
}
.wick{
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  top: -7px;
  width: 2px;
  height: 10px;
  background: rgba(0,0,0,.70);
  border-radius: 99px;
}
.flame{
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  top: -30px;
  width: 18px;
  height: 28px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 30%, #fff7c8 0 35%, #ffc34d 55%, #ff6b2d 82%);
  filter: drop-shadow(0 0 16px rgba(255,196,77,.55));
  animation: flicker 140ms infinite alternate;
  opacity: 1;
}
@keyframes flicker{
  from{ transform: translateX(-50%) rotate(-2deg) scale(0.98); }
  to{ transform: translateX(-50%) rotate(2deg) scale(1.03); }
}
.smoke{
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  top: -26px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,.22);
  opacity: 0;
}
.blown .flame{ opacity:0; animation:none; }
.blown .smoke{
  opacity: 1;
  animation: smokeUp 1.6s ease-out infinite;
}
@keyframes smokeUp{
  0%{ transform: translateX(-50%) translateY(0) scale(.8); opacity: 0; }
  12%{ opacity:.35; }
  100%{ transform: translateX(-50%) translateY(-34px) scale(1.8); opacity: 0; }
}

/* Controls */
.controls{
  margin-top: 10px;
  display:grid;
  gap: 10px;
  justify-items:center;
}
.btn{
  width:min(540px, 100%);
  padding: 12px 14px;
  border-radius: 16px;
  border:1px solid rgba(122,167,255,.35);
  background: linear-gradient(90deg, rgba(122,167,255,.22), rgba(139,255,218,.18));
  color: var(--text);
  font-weight: 800;
  cursor:pointer;
  box-shadow: 0 14px 45px rgba(0,0,0,.35);
  transition: transform .15s ease, border-color .15s ease, opacity .15s ease;
}
.btn:hover{ transform: translateY(-1px); border-color: rgba(139,255,218,.55); }
.btn:active{ transform: translateY(0) scale(.99); }
.btn:disabled{ opacity:.55; cursor:not-allowed; transform:none; }

.status{
  font-size: 12px;
  color: rgba(185,198,230,.85);
}

/* Gift */
.hidden{ display:none !important; }
.giftArea{
  margin-top: 18px;
  display:grid;
  justify-items:center;
  gap: 10px;
  animation: riseIn .6s ease both;
}
@keyframes riseIn{
  from{ opacity:0; transform: translateY(18px); }
  to{ opacity:1; transform: translateY(0); }
}
.giftTitle{
  font-size: 13px;
  color: rgba(234,241,255,.92);
  background: rgba(0,0,0,.18);
  border: 1px solid rgba(255,255,255,.10);
  padding: 8px 12px;
  border-radius: 999px;
}
.giftHint{
  font-size: 12px;
  color: rgba(185,198,230,.85);
}
.gift{
  width: 164px;
  height: 150px;
  border:none;
  background:transparent;
  cursor:pointer;
  position:relative;
  outline:none;
  animation: bob 1.25s ease-in-out infinite;
}
@keyframes bob{
  0%,100%{ transform: translateY(0); }
  50%{ transform: translateY(-6px); }
}
.giftBox{
  position:absolute;
  bottom: 0;
  left:50%;
  transform: translateX(-50%);
  width: 156px;
  height: 108px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255,107,138,.90), rgba(255,107,138,.55));
  border:1px solid rgba(255,255,255,.14);
  box-shadow: 0 22px 55px rgba(0,0,0,.45);
  overflow:hidden;
}
.giftLid{
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  bottom: 92px;
  width: 166px;
  height: 44px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255,107,138,.96), rgba(255,107,138,.62));
  border:1px solid rgba(255,255,255,.14);
  box-shadow: 0 16px 40px rgba(0,0,0,.35);
  overflow:hidden;
  transform-origin: 50% 100%;
}
.ribbonV{
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  top:0;
  width: 26px;
  height: 100%;
  background: linear-gradient(180deg, rgba(139,255,218,.92), rgba(122,167,255,.55));
  opacity:.95;
  border-radius: 999px;
}
.ribbonH{
  position:absolute;
  left:0;
  top:50%;
  transform: translateY(-50%);
  width: 100%;
  height: 18px;
  background: linear-gradient(90deg, rgba(139,255,218,.86), rgba(122,167,255,.55));
  opacity:.55;
}
.giftBox .ribbonH{ opacity:.35; height: 20px; }
.giftBox .ribbonV{ width: 28px; }
.bow{
  position:absolute;
  left:50%;
  top: -4px;
  transform: translateX(-50%);
  width: 86px;
  height: 44px;
  display:flex;
  justify-content:space-between;
  pointer-events:none;
}
.bow span{
  width: 40px;
  height: 32px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(139,255,218,.95), rgba(122,167,255,.65));
  border:1px solid rgba(255,255,255,.16);
  box-shadow: 0 12px 22px rgba(0,0,0,.25);
}
.bow span:first-child{ transform: rotate(-16deg); }
.bow span:last-child{ transform: rotate(16deg); }
.gift.open .giftLid{
  animation: lidPop .55s cubic-bezier(.2,.9,.2,1) forwards;
}
@keyframes lidPop{
  0%{ transform: translateX(-50%) rotate(0); }
  55%{ transform: translateX(-50%) translateY(-10px) rotate(-14deg); }
  100%{ transform: translateX(-50%) translateY(-18px) rotate(-18deg); }
}

/* MENU (şablon) */
.menuOverlay{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.60);
  backdrop-filter: blur(8px);
  display:grid;
  place-items:center;
  z-index: 999;
}
.menuOverlay.hidden{ display:none; }

.menuBox{
  width: min(520px, 92vw);
  border-radius: 22px;
  border:1px solid rgba(255,255,255,.14);
  background: rgba(10,16,40,.92);
  box-shadow: 0 30px 90px rgba(0,0,0,.65);
  padding: 16px 16px 14px;
}

.panel{ display:none; }
.panel.active{ display:block; }

.menuTitle{
  margin: 2px 0 12px;
  font-size: 18px;
  letter-spacing:.2px;
}

.menuItem{
  width: 100%;
  display:flex;
  align-items:center;
  gap: 12px;
  padding: 12px 12px;
  border-radius: 16px;
  border:1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.06);
  color: var(--text);
  font-weight: 800;
  cursor:pointer;
  text-align:left;
  margin: 8px 0;
}
.menuItem:hover{ background: rgba(255,255,255,.08); }

.dot{
  width: 14px; height: 14px;
  border-radius: 4px;
  display:inline-block;
}
.dot.red{ background:#ff4b4b; }
.dot.blue{ background:#4bb3ff; }
.dot.yellow{ background:#ffd24b; }
.dot.orange{ background:#ff8a4b; }
.dot.purple{ background:#b34bff; }

.panelHeader{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 4px 2px 10px;
  margin-bottom: 8px;
}
.panelHeader span{ font-weight: 900; }
.x{
  width: 40px;
  height: 40px;
  border-radius: 14px;
  border:1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.06);
  color: var(--text);
  cursor:pointer;
}

/* friends list */
.list{ display:grid; gap: 10px; }
.listItem{
  padding: 12px 12px;
  border-radius: 16px;
  border:1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.16);
  color: var(--text);
  cursor:pointer;
  text-align:left;
  font-weight: 750;
}
.listItem:hover{ background: rgba(0,0,0,.22); }

/* letter */
.letterText{
  border-radius: 16px;
  border:1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.16);
  padding: 14px;
  line-height: 1.45;
  color: rgba(234,241,255,.93);
}

/* memories */
.carousel{
  display:flex;
  align-items:center;
  gap: 10px;
}
.nav{
  width: 44px;
  height: 44px;
  border-radius: 16px;
  border:1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.06);
  color: var(--text);
  cursor:pointer;
  font-size: 18px;
}
.memBox{ flex:1; text-align:center; }
.memBox img{
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 18px;
  border:1px solid rgba(255,255,255,.14);
}
.memNote{ margin-top: 8px; font-size: 13px; color: rgba(234,241,255,.90); }
.memCount{ margin-top: 4px; font-size: 12px; color: rgba(185,198,230,.85); }
.memHint{ margin-top: 10px; font-size: 12px; color: rgba(185,198,230,.75); }
.memHint code{
  background: rgba(255,255,255,.08);
  padding: 2px 6px;
  border-radius: 8px;
  border:1px solid rgba(255,255,255,.10);
}

/* reasons */
.reasons{
  margin: 0;
  padding-left: 18px;
  line-height: 1.55;
  color: rgba(234,241,255,.93);
}
.reasons li{ margin: 6px 0; }

/* surprise */
.surpriseBox{
  text-align:center;
  padding: 18px;
  border-radius: 18px;
  border:1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.06);
  color: rgba(234,241,255,.93);
}
