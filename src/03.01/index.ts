import getLines from "../shared/getLines";
import { solveInput } from "./exec";

const input = getLines("input.03.01.txt").map(l => l.split(","));
solveInput([input[0], input[1]]);
