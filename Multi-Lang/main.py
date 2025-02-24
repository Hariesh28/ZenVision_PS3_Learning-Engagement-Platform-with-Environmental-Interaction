import os
from pydub import AudioSegment
import speech_recognition as sr

audio_file_path = "base.wav"

def convert_to_wav(input_file):
    """Convert any audio format (MP3, OGG, OPUS, etc.) to WAV"""

    # Extract filename without extension
    filename = os.path.splitext(os.path.basename(input_file))[0]
    output_file = f"{filename}.wav"

    try:
        # Load the audio file (pydub can handle multiple formats)
        audio = AudioSegment.from_file(input_file)
        # Export as WAV (set parameters if needed)
        audio.export(output_file, format="wav")
        print(f"Converted: {input_file} → {output_file}")
    except Exception as e:
        print(f"Error converting {input_file}: {e}")

recognizer = sr.Recognizer()
language_code = "en-US"

with sr.AudioFile(audio_file_path) as source:
    audio_data = recognizer.record(source)

try:
    text = recognizer.recognize_google(audio_data, language=language_code)
    print(f"Transcribed Text ({language_code}): {text}")
except sr.UnknownValueError:
    print("Could not understand the audio")
except sr.RequestError as e:
    print(f"Request error: {e}")