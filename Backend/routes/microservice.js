const _ = require("lodash");

const bcrypt = require("bcrypt");
const { User, validate } = require('../models/userSchema');

const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get