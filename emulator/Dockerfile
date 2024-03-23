FROM python:3.13.0a5-slim-bullseye

ARG PORT
ENV PORT=${PORT}

RUN echo PORT

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

CMD ["sh", "-c", "python emulator.py -p $PORT"]