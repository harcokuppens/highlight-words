pkill 'serve -l 5555'
sleep 1
npx serve -l 5555 &                   # launch webserver on port 5555
sleep 2                               # wait until server is up
open http://localhost:5555/index.html # open html file in webserver
wait                                  # put server back on foreground. Kill with CTRL-C, so that we can relaunch later.
