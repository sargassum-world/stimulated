# stimulated
Reusable modest JS sprinkles & controllers for web apps

## Usage

Make a main script which imports and registers any controllers and custom elements you want to use from this package, e.g.:
```js

import {
	CSRFController,
	DefaultScrollableController,
	FormSubmissionController,
	HideableController,
	ImageAutoreloadController,
	LoadFocusController,
	LoadScrollController,
	NavigationLinkController,
	NavigationMenuController,
	ThemeController,
	TurboCableStreamSourceElement,
	TurboCacheController,
	Turbo,
} from '@sargassum-world/stimulated';
import { Application } from 'stimulus';

Turbo.session.drive = true;

customElements.define(
	'turbo-cable-stream-source',
	TurboCableStreamSourceElement,
)

const Stimulus = Application.start();
Stimulus.register('csrf', CSRFController);
Stimulus.register('default-scrollable', DefaultScrollableController);
Stimulus.register('form-submission', FormSubmissionController);
Stimulus.register('hideable', HideableController);
Stimulus.register('image-autoreload', ImageAutoreloadController);
Stimulus.register('load-focus', LoadFocusController);
Stimulus.register('load-scroll', LoadScrollController);
Stimulus.register('navigation-link', NavigationLinkController);
Stimulus.register('navigation-menu', NavigationMenuController);
Stimulus.register('theme', ThemeController);
Stimulus.register('turbo-cache', TurboCacheController);

export {};

```

Then use your bundler (e.g. rollup) to bundle the main script.

## License

Copyright Prakash Lab and the Sargassum project contributors.

SPDX-License-Identifier: Apache-2.0 OR BlueOak-1.0.0

You can use this project either under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0) or under the [Blue Oak Model License 1.0.0](https://blueoakcouncil.org/license/1.0.0); you get to decide. We chose the Apache license because it's OSI-approved, and because it goes well together with the [Solderpad Hardware License](http://solderpad.org/licenses/SHL-2.1/), which is a license for open hardware used in other related projects but not this project. We prefer the Blue Oak Model License because it's easier to read and understand.
