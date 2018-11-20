import {assert} from 'chai';
import {UserServices} from '../app/_services/user-services';

const user_s = new UserServices;

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});
