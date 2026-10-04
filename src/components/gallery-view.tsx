import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { gallery } from "@/lib/gallery";

export function GalleryView() {
  const [selected, setSelected] = useState<{ group: number; shot: number } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const currentGroup = selected ? gallery[selected.group] : null;
  const currentShot = selected && currentGroup ? currentGroup.shots[selected.shot] : null;

  useEffect(() => {
    if (selected && !dialog.current?.open) dialog.current?.showModal();
    if (!selected && dialog.current?.open) dialog.current.close();
  }, [selected]);

  function step(direction: number) {
    setSelected((value) => {
      if (!value) return null;
      const length = gallery[value.group].shots.length;
      return { ...value, shot: (value.shot + direction + length) % length };
    });
  }

  return (
    <>
      <nav className="gallery-index" aria-label="Gallery collections">
        {gallery.map((group) => <a key={group.id} href={`#${group.id}`}>{group.title}</a>)}
      </nav>
      {gallery.map((group, groupIndex) => (
        <section key={group.id} id={group.id} className="gallery-collection" aria-labelledby={`${group.id}-title`}>
          <div className="collection-heading">
            <p className="kicker">0{groupIndex + 1}</p>
            <div><h2 id={`${group.id}-title`}>{group.title}</h2><p>{group.description}</p></div>
          </div>
          <div className="art-grid">
            {group.shots.map((shot, shotIndex) => (
              <figure key={shot.src}>
                <button type="button" className="art-preview" aria-label={`Enlarge photograph: ${shot.alt}`} onClick={() => setSelected({ group: groupIndex, shot: shotIndex })}>
                  <img src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} loading="lazy" decoding="async" />
                </button>
                <figcaption>{shot.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
      <dialog ref={dialog} className="art-dialog" aria-labelledby="art-dialog-title" onClose={() => setSelected(null)} onCancel={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }} onKeyDown={(event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
      }}>
        {currentShot && currentGroup && selected ? (
          <div className="art-dialog-content">
            <button type="button" className="art-close" aria-label="Close photograph" onClick={() => setSelected(null)}><X aria-hidden="true" /></button>
            <img src={currentShot.src} width={currentShot.width} height={currentShot.height} alt={currentShot.alt} />
            <div className="art-dialog-caption">
              <div><h2 id="art-dialog-title">{currentShot.alt}</h2><p>{currentGroup.title} · Photograph {selected.shot + 1} of {currentGroup.shots.length}</p></div>
              <div className="art-dialog-controls">
                <button type="button" aria-label="Previous photograph" onClick={() => step(-1)}><ArrowLeft aria-hidden="true" /></button>
                <button type="button" aria-label="Next photograph" onClick={() => step(1)}><ArrowRight aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
