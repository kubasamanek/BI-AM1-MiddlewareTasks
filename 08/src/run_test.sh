#!/bin/bash

INPUT_FILE="data/test_inputs.txt"

node producer.js <<EOF
$(cat "$INPUT_FILE")
exit
EOF
