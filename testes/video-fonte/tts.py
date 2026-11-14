import json, sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
VOZ = sys.argv[1] if len(sys.argv) > 1 else "pm_alex"
k = Kokoro("kokoro-v1.0.onnx", "voices-v1.0.bin")
cenas = json.load(open("cenas.json", encoding="utf-8"))
dur = {}
for c in cenas:
    amostras, sr = k.create(c["texto"], voice=VOZ, speed=1.0, lang="pt-br", trim=True)
    sf.write(f"audio/{c['id']}.wav", amostras, sr)
    dur[c["id"]] = round(len(amostras) / sr, 2)
    print(c["id"], dur[c["id"]], "s", "sr", sr)
json.dump(dur, open("duracoes.json", "w"), indent=1)
print("TOTAL_NARRACAO", round(sum(dur.values()), 2))
