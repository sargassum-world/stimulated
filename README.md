# stimulated
Reusable modest JS sprinkles & controllers for web apps

## Usage

Make a main script which imports and registers your various controllers, e.g.:
```js

import * as Turbo from '@hotwired/turbo';
import { Application } from 'stimulus';

import ThemeController from '@sargassum-world/stimulated/theme.controller';
import NavigationMenuController from '@sargassum-world/stimulated/navigation-menu.controller';
import NavigationLinkController from '@sargassum-world/stimulated/navigation-link.controller';
import FormSubmissionController from '@sargassum-world/stimulated/form-submission.controller';
import CSRFController from '@sargassum-world/stimulated/csrf.controller';
import DefaultScrollableController from '@sargassum-world/stimulated/default-scrollable.controller';
import TurboCacheController from '@sargassum-world/stimulated/turbo-cache.controller';

Turbo.session.drive = true;

const Stimulus = Application.start();
Stimulus.register('theme', ThemeController);
Stimulus.register('navigation-menu', NavigationMenuController);
Stimulus.register('navigation-link', NavigationLinkController);
Stimulus.register('form-submission', FormSubmissionController);
Stimulus.register('csrf', CSRFController);
Stimulus.register('default-scrollable', DefaultScrollableController);
Stimulus.register('turbo-cache', TurboCacheController);

export {};

```

Then use your bundler (e.g. rollup) to bundle the main script.

## License

Copyright Prakash Lab and the Sargassum project contributors.

SPDX-License-Identifier: Apache-2.0 OR BlueOak-1.0.0

You can use this project either under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0) or under the [Blue Oak Model License 1.0.0](https://blueoakcouncil.org/license/1.0.0); you get to decide. We chose the Apache license because it's OSI-approved, and because it goes well together with the [Solderpad Hardware License](http://solderpad.org/licenses/SHL-2.1/), which is a license for open hardware used in other related projects but not this project. We prefer the Blue Oak Model License because it's easier to read and understand.
