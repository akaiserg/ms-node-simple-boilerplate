FROM registry.fif.tech:5000/fif-pm2-base:latest

ENV BASE_PATH /home/service
ADD . $BASE_PATH
USER root
RUN touch /run/secrets/variables.sh; chmod +x /run/secrets/variables.sh

WORKDIR $BASE_PATH
RUN touch startup.sh && \
	echo "#!/bin/bash" >> startup.sh && \
	echo "source /run/secrets/variables.sh" >> startup.sh && \
	echo "pm2-docker bin/www" >> startup.sh && \
	chmod +x startup.sh

EXPOSE 3015
CMD ["/bin/sh", "startup.sh"]