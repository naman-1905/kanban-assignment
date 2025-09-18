(function () {
  function initDragDrop() {
    document.querySelectorAll(".dropzone").forEach(zone => {
      zone.addEventListener("dragover", e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        zone.classList.add("drop-hover");
      });

      zone.addEventListener("dragleave", () => {
        zone.classList.remove("drop-hover");
      });

      zone.addEventListener("drop", e => {
        e.preventDefault();
        zone.classList.remove("drop-hover");
        const id = e.dataTransfer.getData("text/plain");
        if (!id) return;
        const task = storage.getTaskById(id);
        if (!task) return;
        storage.updateTask(id, { status: zone.id });
      });
    });
  }

  window.dragdrop = { initDragDrop };
})();
