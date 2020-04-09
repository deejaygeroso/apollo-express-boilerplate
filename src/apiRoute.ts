import express from 'express'
import { sample } from './api'

const router = express.Router()

router.get('/sample', sample)


export default router
