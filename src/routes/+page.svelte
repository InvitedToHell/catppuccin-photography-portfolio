<script>
  import { goto } from "$app/navigation";
  import ThemeSwitch from "$lib/components/themeSwitch.svelte";
  import { supabase } from "$lib/supabaseClient";
  import Gallery from "svelte-image-gallery";

  let imageCount = 10;
  const totalImages = 30; // Assuming there are 30 images available
  let images = Array.from(
    { length: imageCount },
    (_, i) => `/images/edinburgh-${i + 1}.jpg`,
  );

  function loadMoreImages() {
    if (imageCount < totalImages) {
      const nextImages = Array.from(
        { length: Math.min(10, totalImages - imageCount) }, // Load up to 10 more images, or fewer if fewer than 10 remain
        (_, i) => `/images/edinburgh-${imageCount + i + 1}.jpg`,
      );
      images = [...images, ...nextImages];
      imageCount += nextImages.length; // Increase by the actual number of images added
    }
  }

  function handleClick(e) {
    console.log(e.detail.src);
  }
  // Import goto from $app/navigation
  // Import navigate function if using svelte-routing for navigation

  let loggedIn = false;
  supabase.auth.getUser().then((user) => {
    loggedIn = user !== null;
  });

  function redirectToLogin() {
    goto("/login"); // Use this for svelte-routing
    // Or use window.location.href = '/login'; for a non-svelte-routing approach
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    loggedIn = false;
  }
  let isHovered = false;
</script>

<div class="navbar glass sticky top-0">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div class="flex-none gap-2">
    <ThemeSwitch />
    {#if loggedIn}
      <button class="btn" onclick="my_modal_4.showModal()">Upload</button>
      <dialog id="my_modal_4" class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
          <h3 class="text-lg font-bold">Upload</h3>
          <p class="py-4">Click the button below to close</p>
          <input
            type="file"
            class="file-input self-center file-input-bordered file-input-primary w-full max-w-xs"
          />
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a on:click={signOut}>Logout</a></li>
        </ul>
      </div>
    {:else}
      <button class="btn" on:click={redirectToLogin}>Login</button>
    {/if}
  </div>
</div>
<Gallery on:click={handleClick}>
  {#each images as image}
    <img class="" src={image} alt="Image gallery" />
  {/each}
</Gallery>
{#if imageCount < totalImages}
  <button on:click={loadMoreImages}>Load More</button>
{/if}

<style>
</style>
