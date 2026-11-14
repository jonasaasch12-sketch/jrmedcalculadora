# Gera a narração de cada cena (uma voz e uma velocidade) e grava audio/<cena>.wav e duracoes.json.
# Uso, dentro da pasta de trabalho (com cenas.json e os arquivos do modelo):
#   python3 tts.py [voz] [velocidade]
# Padrão: pf_dora (feminina, pt-BR), velocidade 0.95.
import json, os, sys
import soundfile as sf
from kokoro_onnx import Kokoro
VOZ = sys.argv[1] if len(sys.argv) > 1 else "pf_dora"
VEL = float(sys.argv[2]) if len(sys.argv) > 2 else 0.95
os.makedirs("audio", exist_ok=True)
k = Kokoro("kokoro-v1.0.onnx", "voices-v1.0.bin")
cenas = json.load(open("cenas.json", encoding="utf8"))
dur = {}
for c in cenas:
    a, sr = k.create(c["texto"], voice=VOZ, speed=VEL, lang="pt-br", trim=True)
    sf.write(f"audio/{c['id']}.wav", a, sr)
    dur[c["id"]] = round(len(a) / sr, 2)
    print(c["id"], dur[c["id"]], "s")
json.dump(dur, open("duracoes.json", "w"), indent=1)
print("TOTAL_NARRACAO", round(sum(dur.values()), 2))
