import { getGalleryFilenames, pickGalleryLayout } from "@/lib/gallery";
import WorkspaceGalleryGrid from "@/components/WorkspaceGalleryGrid";

export default function WorkspaceGallery() {
  const files = getGalleryFilenames();

  if (files.length === 0) {
    return (
      <section className="py-24 lg:py-32 bg-white" aria-labelledby="workspace-gallery-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              id="workspace-gallery-heading"
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{ color: "#1A2B2E" }}
            >
              Our Workspace &amp;{" "}
              <em style={{ color: "#0E5D6B", fontStyle: "italic" }}>Team</em>
            </h2>
            <p className="text-base max-w-2xl mx-auto mb-8" style={{ color: "#64748B" }}>
              Gallery photos will appear here once they are added to the project.
            </p>
            <div
              className="mx-auto max-w-xl rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-5 text-left text-sm text-gray-600"
            >
              <p className="font-semibold text-gray-800 mb-2">Add your office photos</p>
              <p className="mb-3">
                In Terminal (from the project folder), run:
              </p>
              <pre className="overflow-x-auto rounded-lg bg-white p-3 text-xs text-gray-800 border border-gray-200">
{`./scripts/copy-gallery-images.sh`}
              </pre>
              <p className="mt-3 text-xs text-gray-500">
                Or copy your JPGs into <code className="text-gray-700">public/gallery/</code>{" "}
                (include <code className="text-gray-700">10.jpg</code> for the large owner photo).
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { featuredName, tiles } = pickGalleryLayout(files);

  return <WorkspaceGalleryGrid featuredFile={featuredName} tileFiles={tiles} />;
}
