// Lo importamos como type porque solo se usan como tipos
import type { DecodedIdToken } from 'firebase-admin/auth';
import type { Request } from 'express';

// la Request de Express no sabe que yo le agrego user, por eso la extiendo
export interface AuthenticatedRequest extends Request {
  user?: DecodedIdToken;
}
