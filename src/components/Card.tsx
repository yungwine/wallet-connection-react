import {isMobile} from "../utils";

export function Card({ title, children }: { title: string; children: any; }) {
    if (!isMobile()) {
      return (
        <div
          style={{
            background: "#00000033",
            borderRadius: 12,
            padding: "4px 12px 16px",
            marginBottom: 20,
          }}
        >
          <h2>{title}</h2>
          {children}
        </div>
      ); }
    else {
        return (
            <div
                style={{
                    background: "#00000033",
                    borderRadius: 12,
                    padding: "4px 12px 16px",
                    marginBottom: 20,
                }}
            >
                <h2>{title}</h2>
                {children}
            </div>
        );
    }
}
