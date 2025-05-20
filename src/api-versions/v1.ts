import type { Router } from 'express';
import testRouter from '../routers/test';

const v1Api: Router[] = [testRouter];

export default v1Api;
