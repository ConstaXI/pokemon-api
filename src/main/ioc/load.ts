import bindControllers from './bind-controllers';
import bindInteractors from './bind-interactors';
import bindRepositories from './bind-repositories';
import container from './container';

container.load(bindRepositories);
container.load(bindInteractors);
container.load(bindControllers);
