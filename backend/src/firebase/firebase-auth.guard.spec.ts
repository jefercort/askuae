import { FirebaseAuthGuard } from './firebase-auth.guard';
import { FirebaseService } from './firebase.service';

describe('FirebaseAuthGuard', () => {
  it('should be defined', () => {
    expect(new FirebaseAuthGuard({} as FirebaseService)).toBeDefined();
  });
});
