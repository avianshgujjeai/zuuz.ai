import { MapPin, AlertCircle } from "lucide-react";
import type { OfficeLocation } from "@/content/about";

interface LocationCardProps {
  location: OfficeLocation;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 h-full">
      <div className="mb-3 flex items-center gap-2">
        <MapPin className="h-4 w-4 text-primary" />
        <h3 className="text-base font-semibold text-foreground">{location.label}</h3>
      </div>

      {location.isTodo ? (
        <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3">
          <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-700">{location.address[0]}</p>
        </div>
      ) : location.mapsUrl ? (
        <a
          href={location.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-muted-foreground leading-relaxed hover:text-primary transition-colors"
        >
          {location.address.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </a>
      ) : (
        <div className="text-sm text-muted-foreground leading-relaxed">
          {location.address.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </div>
      )}
    </div>
  );
}
