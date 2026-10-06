# m10 animation alternatives

The active design-strategy case is a standalone route with a white panel that fades in and rises 24 px over 280 ms. Content fades in after 70 ms.

`m10-card-expansion.tar.gz` preserves the previous working prototype and its integration files before the route change. It uses a native dialog, expands from the clicked card over 300 ms, and collapses over 190 ms. It includes scroll locking, focus restoration, Escape handling, and reduced-motion support. Extract into a temporary directory and compare the saved components before restoring; do not overwrite later content changes wholesale.

An alternative discussed but not implemented is a standalone route with a shared white surface animated from the source card using View Transitions. The card's preview and text would not morph; destination content would fade in after the surface expands.
