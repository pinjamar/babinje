DEPLOY_DIR="~/prod/babinje.codebase.hr/web"
REMOTE="brbulic@babinje.codebase.hr"

yarn build
ssh ${REMOTE} "rm -rv ${DEPLOY_DIR}; mkdir -p ${DEPLOY_DIR}"
rm ./dist/*.map
scp -vr dist/* ${REMOTE}:${DEPLOY_DIR}
scp copy-to-www.sh ${REMOTE}:~
yarn clean