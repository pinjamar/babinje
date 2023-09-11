FILES_DIR="./prod/babinje.codebase.hr/web"
SITE_DIR="/var/www/babinje"

sudo chown -R www-data:www-data ${FILES_DIR}
sudo rm -r ${SITE_DIR}/*
sudo mv ${FILES_DIR}/* ${SITE_DIR}