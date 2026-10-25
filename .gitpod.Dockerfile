FROM gitpod/workspace-full-vnc:latest

ENV FLUTTER_HOME=/home/gitpod/flutter
ENV FLUTTER_VERSION=3.22.0-stable
ENV ANDROID_HOME=/home/gitpod/android-sdk

USER root
RUN apt-get update && apt-get install -y \
    libglu1-mesa \
    libpulse0 \
    unzip \
    wget \
    openjdk-17-jdk \
    && rm -rf /var/lib/apt/lists/*

USER gitpod

# Flutter Install Karo
RUN cd /home/gitpod && \
    wget -qO flutter_sdk.tar.xz https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_${FLUTTER_VERSION}.tar.xz && \
    tar -xvf flutter_sdk.tar.xz && \
    mv flutter flutter_sdk && \
    rm flutter_sdk.tar.xz

ENV PATH=$FLUTTER_HOME/bin:$PATH

# Android Command-line Tools Install Karo
RUN cd /home/gitpod && \
    wget -qO commandlinetools.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip && \
    unzip commandlinetools.zip -d android-sdk && \
    rm commandlinetools.zip

ENV PATH=$ANDROID_HOME/cmdline-tools/bin:$ANDROID_HOME/platform-tools:$PATH

# Android SDK Packages Install Karo
RUN yes | sdkmanager --sdk_root=$ANDROID_HOME "platform-tools" "platforms;android-33" "system-images;android-33;google_apis;x86_64"