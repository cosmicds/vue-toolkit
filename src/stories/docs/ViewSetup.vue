<template>
  <div>
    <p>
      In this example, there are two reasons that we want to have a splash screen:
      <ul>
        <li>The WorldWide Telescope JavaScript engine that we're using needs a bit of time to start up. Before it's ready the WWT canvas will be blank - we don't want to show a user that.</li>
        <li>Additionally, we'll have our own setup to do. We'll want to move WWT to the correct position, set up the images that we want to use, etc. We don't want to make this disorienting for the user with a lot of initial, quick visible changes.</li>
      </ul>

      Neither of these items should take very long at all, but ultimately it's something that's beyond our control - a user may have a very slow internet connection, for example. So it's better to be safe.
    </p>
  </div>
</template>
