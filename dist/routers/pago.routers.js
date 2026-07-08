"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pago_controller_1 = require("../modules/interfaces/pago.controller");
const router = (0, express_1.Router)();
router.post('/:id', pago_controller_1.pagar);
exports.default = router;
