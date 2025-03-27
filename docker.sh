#!/bin/bash

docker run -it -p 5500:5500 -v $PWD:/usr/src/app -w /usr/src/app node bash