import json, os, subprocess
import numpy as np, soundfile as sf
os.chdir(os.path.join(os.environ['S'], 'video'))
dur = json.load(open('duracoes.json', encoding='utf8'))
marcas = json.load(open('marcas.json', encoding='utf8'))
VIDEO = marcas['video']
OFF = (marcas['pronto'] - marcas['criada']) / 1000.0
PRE, POS, X = 0.4, 0.6, 0.6
ORDEM = ['01_busca', '02_dose', '03_receita', '04_condutas', '05_alergia']
ext = {k: dur[k] + PRE + POS for k in ORDEM}
ext['04_condutas'] += 1.0
starts, t = {}, 0.0
for k in ORDEM:
    starts[k] = t
    t += ext[k]
D1 = t
D0 = dur['00_intro'] + 0.4 + 0.9
D2 = dur['06_fim'] + 0.4 + 1.2
APP0 = D0 - X
FIM0 = D0 + D1 - 2 * X
TOTAL = FIM0 + D2
print(f'D0={D0:.2f} D1={D1:.2f} D2={D2:.2f} TOTAL={TOTAL:.2f} OFF={OFF:.2f}')
print({k: round(v, 2) for k, v in starts.items()})

RA = 24000
buf = np.zeros(int(TOTAL * RA) + RA, dtype=np.float32)
def coloca(cid, ts):
    x, sr = sf.read(f'audio/{cid}.wav', dtype='float32')
    assert sr == RA, sr
    i = int(round(ts * RA))
    buf[i:i + len(x)] += x
coloca('00_intro', 0.4)
for k in ORDEM:
    coloca(k, APP0 + starts[k] + PRE)
coloca('06_fim', FIM0 + PRE)
sf.write('narracao.wav', buf[:int(TOTAL * RA)], RA)

def run(cmd):
    subprocess.run(cmd, check=True)

run(['ffmpeg', '-y', '-v', 'error', '-loop', '1', '-t', f'{D0:.3f}', '-i', 'render/intro.png',
     '-vf', 'fps=30,format=yuv420p,fade=t=in:st=0:d=0.5', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-an', 'seg_intro.mp4'])
run(['ffmpeg', '-y', '-v', 'error', '-loop', '1', '-t', f'{D2:.3f}', '-i', 'render/outro.png',
     '-vf', f'fps=30,format=yuv420p,fade=t=out:st={D2-0.8:.3f}:d=0.8', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-an', 'seg_outro.mp4'])

S1, S2, S3, S4, S5 = [starts[k] for k in ORDEM]
fc = (f"[0:v]fps=30,scale=434:940:flags=lanczos,setsar=1[rec];"
      f"[7:v][rec]overlay=143:300:shortest=1[a0];"
      f"[a0][1:v]overlay=71:228[a1];"
      f"[a1][2:v]overlay=0:0:enable='between(t,{S1:.3f},{S2:.3f})'[a2];"
      f"[a2][3:v]overlay=0:0:enable='between(t,{S2:.3f},{S3:.3f})'[a3];"
      f"[a3][4:v]overlay=0:0:enable='between(t,{S3:.3f},{S4:.3f})'[a4];"
      f"[a4][5:v]overlay=0:0:enable='between(t,{S4:.3f},{S5:.3f})'[a5];"
      f"[a5][6:v]overlay=0:0:enable='between(t,{S5:.3f},{D1:.3f})'[a6];"
      f"[a6]drawbox=x=0:y=1258:w=720:h=8:color=white@0.25:t=fill,"
      f"drawbox=x=0:y=1258:w='720*t/{D1:.3f}':h=8:color=white@0.95:t=fill[v]")
cmd = ['ffmpeg', '-y', '-v', 'error', '-ss', f'{OFF:.3f}', '-t', f'{D1:.3f}', '-i', VIDEO,
       '-loop', '1', '-t', f'{D1:.3f}', '-i', 'render/moldura.png']
for i in range(1, 6):
    cmd += ['-loop', '1', '-t', f'{D1:.3f}', '-i', f'render/titulo{i}.png']
cmd += ['-f', 'lavfi', '-t', f'{D1:.3f}', '-i', 'color=c=0x005eb8:s=720x1280:r=30',
        '-filter_complex', fc, '-map', '[v]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17',
        '-pix_fmt', 'yuv420p', '-r', '30', 'seg_app.mp4']
run(cmd)

run(['ffmpeg', '-y', '-v', 'error', '-i', 'seg_intro.mp4', '-i', 'seg_app.mp4', '-i', 'seg_outro.mp4', '-i', 'narracao.wav',
     '-filter_complex', (f"[0:v][1:v]xfade=transition=fade:duration={X}:offset={D0-X:.3f}[v1];"
                         f"[v1][2:v]xfade=transition=fade:duration={X}:offset={FIM0:.3f}[v];"
                         "[3:a]loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000,pan=stereo|c0=c0|c1=c0[a]"),
     '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-maxrate', '2800k', '-bufsize', '5600k',
     '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.1', '-r', '30', '-c:a', 'aac', '-b:a', '128k', '-ar', '48000',
     '-t', f'{TOTAL:.3f}', '-movflags', '+faststart', 'final/apresentacao.mp4'])
subprocess.run(['cp', 'render/capa.jpg', 'final/apresentacao-capa.jpg'], check=True)
print('OK final/apresentacao.mp4')
