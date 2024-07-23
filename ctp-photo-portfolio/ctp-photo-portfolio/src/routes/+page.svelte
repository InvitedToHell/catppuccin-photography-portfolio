<script>
  import { goto } from "$app/navigation";
  import ThemeSwitch from "$lib/components/themeSwitch.svelte";
  import { supabase } from "$lib/supabaseClient";
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
</script>

<div class="navbar glass">
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

<div class="carousel rounded-box">
  <div class="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
      alt="Burger"
    />
  </div>
  <div class="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
      alt="Burger"
    />
  </div>
  <div class="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
      alt="Burger"
    />
  </div>
  <div class="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
      alt="Burger"
    />
  </div>
  <div class="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
      alt="Burger"
    />
  </div>
  <div class="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
      alt="Burger"
    />
  </div>
  <div class="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
      alt="Burger"
    />
  </div>
</div>
