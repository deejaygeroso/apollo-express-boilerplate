import express from 'express'
import sample from './sample'

const router = express.Router()

router.get('/sample', sample)

export default router
