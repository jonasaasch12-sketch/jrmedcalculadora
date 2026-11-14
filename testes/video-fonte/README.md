# Vídeo da página inicial (teste)

Fonte do `video/apresentacao.mp4` (cerca de 1 minuto, com narração em português) e da capa `video/apresentacao-capa.jpg`.

Esta pasta **não é publicada**: o `publicar.yml` copia o site sem `testes/`.

## Como refazer

1. Escolha uma pasta de trabalho fora do repositório e aponte a variável `S` para o caminho dela (`export S=/caminho/trabalho`).
2. Narração (voz sintética, Kokoro, licença Apache-2.0):
   - `python3 -m venv $S/video/venv && $S/video/venv/bin/pip install kokoro-onnx soundfile numpy`
   - Baixe `kokoro-v1.0.onnx` e `voices-v1.0.bin` (release `model-files-v1.0` do projeto kokoro-onnx) para `$S/video/`.
   - Copie `cenas.json` para `$S/video/` e rode `python3 tts.py` (padrão: pf_dora, velocidade 0.95) dentro de `$S/video/` (gera `audio/*.wav` e `duracoes.json`).
3. Gravação do app: sirva o repositório como `.../teste/` numa porta local (ex.: 8799, com uma pasta contendo um link `teste` apontando para a raiz do repositório) e rode `node gravar.js` dentro de `$S/video/` (gera `marcas.json`).
4. Imagens (abertura, encerramento, títulos de cada passo e moldura do celular): `node render.js`.
5. Montagem: `$S/video/venv/bin/python build.py` (gera `final/apresentacao.mp4` e `final/apresentacao-capa.jpg`).

Os scripts acima ficam aqui para refazer o vídeo quando um texto ou uma tela mudar.

## Parâmetros

- Voz: `pf_dora` (pt-BR, feminina), velocidade 0.95. Escolhida entre as vozes gratuitas em português. A narração é sintética.
- Dados do exemplo na gravação: dipirona gotas, 4 anos, 16 kg. A dose é a que o próprio app calcula.
- Textos de cada passo: `render.js` (lista `TITULOS`) e `cenas.json` (narração).
- Tempo de cada cena: texto da narração + pausas definidas em `build.py` e `gravar.js`.
