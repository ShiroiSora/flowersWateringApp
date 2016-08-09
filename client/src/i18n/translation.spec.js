import {
    en
}
from './en.js';

import {
    ru
}
from './ru.js';

describe('translation', () => {
    it('must have matching keys for both ru and en',
        inject((en, ru) => {
            en.should.have.equalKeys(ru);
        }));
});