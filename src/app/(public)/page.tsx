import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getWatchUrl } from "@/lib/youtube";
import NewsletterForm from "@/components/NewsletterForm";
import EpisodeThumbnail from "@/components/EpisodeThumbnail";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: episodes }, { data: spotlights }] = await Promise.all([
    supabase
      .from("episodes")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(3),
    supabase
      .from("spotlights")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section style={{ background: "#1A0A2E", position: "relative", overflow: "hidden" }}>
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(194,85,122,0.28),transparent 65%)",
          }}
        />
        <div
          className="rsp-2col rsp-px"
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "84px 32px 90px",
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: 60,
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Left: text */}
          <div>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#E91E8C",
                marginBottom: 22,
              }}
            >
              COMMUNITY · FINANCE · EMPOWERMENT
            </div>
            <h1
              className="rsp-h1"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 800,
                fontSize: 62,
                lineHeight: 1.04,
                color: "#fff",
                margin: "0 0 18px",
                letterSpacing: "-0.01em",
              }}
            >
              Good News in the CSRA
            </h1>
            <div
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontStyle: "italic",
                fontSize: 24,
                color: "#F8A5C8",
                marginBottom: 24,
              }}
            >
              CSRA good news you can use.
            </div>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: "#CBBDD8",
                maxWidth: 520,
                margin: "0 0 34px",
              }}
            >
              The Alicia Fitts Show brings you the positive stories, financial
              insights, and community spotlights that the CSRA deserves to
              hear — hosted by Alicia Fitts, speaker, consultant, and community
              advocate.
            </p>
            <div className="rsp-btn-group" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link
                href="/episodes"
                style={{
                  background: "#E91E8C",
                  color: "#fff",
                  border: "none",
                  borderRadius: 999,
                  padding: "16px 30px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 10px 28px rgba(233,30,140,0.35)",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Watch Latest Episode
              </Link>
              <Link
                href="/be-on-the-show"
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  borderRadius: 999,
                  padding: "16px 30px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Be on the Show
              </Link>
            </div>
          </div>

          {/* Right: host photo */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 30px 70px rgba(0,0,0,0.4)",
                aspectRatio: "3/4",
                background: "linear-gradient(150deg,#3A2456,#1A0A2E)",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <img
                src="/images/hero-host.jpg"
                alt="Alicia Fitts"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg,transparent 55%,rgba(26,10,46,0.55))",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 22,
                  bottom: 20,
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: 700,
                    fontSize: 20,
                  }}
                >
                  Alicia Fitts
                </div>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    color: "#F8A5C8",
                    fontWeight: 600,
                  }}
                >
                  YOUR HOST
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Features ── */}
      <section style={{ background: "#fff" }}>
        <div
          className="rsp-3col rsp-px"
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "70px 32px",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 30,
          }}
        >
          {/* Community Focused */}
          <div>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 13,
                background: "#F4ECF8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: "3px solid #5B2D8E",
                }}
              />
            </div>
            <h3
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: 21,
                color: "#4A2A6B",
                margin: "0 0 8px",
              }}
            >
              Community Focused
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#6B6473", margin: 0 }}>
              Highlighting the people and organizations making a real difference
              across the CSRA.
            </p>
          </div>

          {/* Finance & Empowerment */}
          <div>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 13,
                background: "#FBE9F2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  background: "#E91E8C",
                }}
              />
            </div>
            <h3
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: 21,
                color: "#4A2A6B",
                margin: "0 0 8px",
              }}
            >
              Finance &amp; Empowerment
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#6B6473", margin: 0 }}>
              Practical financial insights you can actually use in your everyday
              life.
            </p>
          </div>

          {/* CSRA Spotlight */}
          <div>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 13,
                background: "#F1ECF8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "9px solid transparent",
                  borderRight: "9px solid transparent",
                  borderBottom: "16px solid #8E5BA8",
                }}
              />
            </div>
            <h3
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: 21,
                color: "#4A2A6B",
                margin: "0 0 8px",
              }}
            >
              CSRA Spotlight
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#6B6473", margin: 0 }}>
              Celebrating local talent, small businesses, and the community
              heroes among us.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3: Latest Episodes ── */}
      <section style={{ background: "#F7F2FB" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "74px 32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 34,
              flexWrap: "wrap",
              gap: 14,
            }}
          >
            <h2
              className="rsp-h2-md"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 800,
                fontSize: 40,
                color: "#4A2A6B",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Latest Episodes
            </h2>
            <Link
              href="/episodes"
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#E91E8C",
                textDecoration: "none",
              }}
            >
              View All Episodes →
            </Link>
          </div>

          <div
            className="rsp-3col"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 26,
            }}
          >
            {episodes && episodes.length > 0 ? (
              episodes.map((ep) => (
                <a
                  key={ep.id}
                  href={ep.youtube_id ? getWatchUrl(ep.youtube_id) : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#fff",
                    borderRadius: 18,
                    overflow: "hidden",
                    boxShadow: "0 14px 36px rgba(74,42,107,0.08)",
                    textDecoration: "none",
                    display: "block",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "16/9",
                      background: "linear-gradient(135deg,#3A2456,#241B33)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {ep.youtube_id && <EpisodeThumbnail videoId={ep.youtube_id} title={ep.title} />}
                    {ep.youtube_id && (
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)" }} />
                    )}
                    <div
                      style={{
                        position: "relative",
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.16)",
                        backdropFilter: "blur(4px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1.5px solid rgba(255,255,255,0.4)",
                      }}
                    >
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: "16px solid #fff",
                          borderTop: "10px solid transparent",
                          borderBottom: "10px solid transparent",
                          marginLeft: 4,
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ padding: "22px 22px 24px" }}>
                    {ep.category && (
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: 10.5,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          color: "#C2557A",
                          background: "#FBE9F2",
                          borderRadius: 999,
                          padding: "5px 11px",
                          marginBottom: 13,
                        }}
                      >
                        {ep.category}
                      </span>
                    )}
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontWeight: 700,
                        fontSize: 18,
                        lineHeight: 1.3,
                        color: "#3A2A4D",
                        margin: "0 0 10px",
                      }}
                    >
                      {ep.title}
                    </h3>
                    {ep.guest_name && (
                      <div
                        style={{
                          fontSize: 13.5,
                          color: "#E91E8C",
                          fontWeight: 600,
                          marginBottom: 3,
                        }}
                      >
                        {ep.guest_name}
                      </div>
                    )}
                    {ep.published_at && (
                      <div
                        style={{
                          fontSize: 12.5,
                          color: "#9189A0",
                          marginBottom: 12,
                        }}
                      >
                        {new Date(ep.published_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    )}
                    <div
                      style={{ fontSize: 14, fontWeight: 600, color: "#4A2A6B" }}
                    >
                      Watch Now →
                    </div>
                  </div>
                </a>
              ))
            ) : (
              /* Placeholder cards when no data */
              [1, 2, 3].map((n) => (
                <div
                  key={n}
                  style={{
                    background: "#fff",
                    borderRadius: 18,
                    overflow: "hidden",
                    boxShadow: "0 14px 36px rgba(74,42,107,0.08)",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "16/9",
                      background: "linear-gradient(135deg,#3A2456,#241B33)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.16)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1.5px solid rgba(255,255,255,0.4)",
                      }}
                    >
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: "16px solid #fff",
                          borderTop: "10px solid transparent",
                          borderBottom: "10px solid transparent",
                          marginLeft: 4,
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ padding: "22px 22px 24px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: "#C2557A",
                        background: "#FBE9F2",
                        borderRadius: 999,
                        padding: "5px 11px",
                        marginBottom: 13,
                      }}
                    >
                      COMMUNITY
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontWeight: 700,
                        fontSize: 18,
                        lineHeight: 1.3,
                        color: "#3A2A4D",
                        margin: "0 0 10px",
                      }}
                    >
                      Episode {n} – Coming Soon
                    </h3>
                    <div
                      style={{
                        fontSize: 13.5,
                        color: "#E91E8C",
                        fontWeight: 600,
                        marginBottom: 3,
                      }}
                    >
                      Alicia Fitts
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#4A2A6B" }}>
                      Watch Now →
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── Section 4: Meet Your Host ── */}
      <section style={{ background: "#fff" }}>
        <div
          className="rsp-2col rsp-px"
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "80px 32px",
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          {/* Photo */}
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 24px 56px rgba(74,42,107,0.16)",
              aspectRatio: "3/4",
              background: "linear-gradient(150deg,#6B3F8F,#3A2456)",
            }}
          >
            <img
              src="/images/meet-your-host.jpg"
              alt="Alicia Fitts"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(160deg,transparent 60%,rgba(91,45,142,0.4))",
              }}
            />
          </div>

          {/* Text */}
          <div>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#E91E8C",
                marginBottom: 16,
              }}
            >
              MEET YOUR HOST
            </div>
            <h2
              className="rsp-h2-lg"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 800,
                fontSize: 46,
                color: "#4A2A6B",
                margin: "0 0 22px",
                letterSpacing: "-0.01em",
              }}
            >
              Alicia Fitts
            </h2>
            <p
              style={{
                fontSize: 16.5,
                lineHeight: 1.7,
                color: "#6B6473",
                margin: "0 0 18px",
              }}
            >
              Alicia Fitts is a speaker, financial consultant, and community
              advocate based in the CSRA. With years of experience empowering
              individuals and organizations, she created{" "}
              <em>Good News in the CSRA</em> to shine a light on the positive
              stories that define our community.
            </p>
            <Link
              href="/about"
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#E91E8C",
                textDecoration: "none",
              }}
            >
              Learn More About Alicia →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 5: Community Spotlight ── */}
      <section style={{ background: "#F7F2FB" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "74px 32px" }}>
          <div
            style={{
              textAlign: "center",
              maxWidth: 560,
              margin: "0 auto 40px",
            }}
          >
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#E91E8C",
                marginBottom: 14,
              }}
            >
              COMMUNITY SPOTLIGHT
            </div>
            <h2
              className="rsp-h2-md"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 800,
                fontSize: 40,
                color: "#4A2A6B",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              The people we can&apos;t stop talking about
            </h2>
          </div>

          <div
            className="rsp-3col"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 26,
              marginBottom: 38,
            }}
          >
            {spotlights && spotlights.length > 0 ? (
              spotlights.map((sp) => (
                <Link
                  key={sp.id}
                  href="/spotlight"
                  style={{
                    background: "#fff",
                    borderRadius: 18,
                    overflow: "hidden",
                    boxShadow: "0 14px 36px rgba(74,42,107,0.08)",
                    textDecoration: "none",
                    display: "block",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "1/1",
                      background: "linear-gradient(150deg,#6B3F8F,#3A2456)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {sp.photo_url ? (
                      <img
                        src={sp.photo_url}
                        alt={sp.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.14)",
                          border: "1.5px solid rgba(248,165,200,0.5)",
                        }}
                      />
                    )}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg,transparent 60%,rgba(36,27,51,0.5))",
                      }}
                    />
                  </div>
                  <div style={{ padding: "20px 22px 24px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#4A2A6B",
                        margin: "0 0 4px",
                      }}
                    >
                      {sp.name}
                    </h3>
                    {sp.category && (
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          color: "#E91E8C",
                          marginBottom: 10,
                        }}
                      >
                        {sp.category}
                      </div>
                    )}
                    {sp.impact && (
                      <p
                        style={{
                          fontSize: 14,
                          lineHeight: 1.55,
                          color: "#6B6473",
                          margin: "0 0 14px",
                        }}
                      >
                        {sp.impact}
                      </p>
                    )}
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "#4A2A6B" }}>
                      Read Their Story →
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              [1, 2, 3].map((n) => (
                <div
                  key={n}
                  style={{
                    background: "#fff",
                    borderRadius: 18,
                    overflow: "hidden",
                    boxShadow: "0 14px 36px rgba(74,42,107,0.08)",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "1/1",
                      background: "linear-gradient(150deg,#6B3F8F,#3A2456)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.14)",
                        border: "1.5px solid rgba(248,165,200,0.5)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg,transparent 60%,rgba(36,27,51,0.5))",
                      }}
                    />
                  </div>
                  <div style={{ padding: "20px 22px 24px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#4A2A6B",
                        margin: "0 0 4px",
                      }}
                    >
                      Community Hero {n}
                    </h3>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: "#E91E8C",
                        marginBottom: 10,
                      }}
                    >
                      SPOTLIGHT
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.55,
                        color: "#6B6473",
                        margin: "0 0 14px",
                      }}
                    >
                      Making a difference in the CSRA community every day.
                    </p>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "#4A2A6B" }}>
                      Read Their Story →
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link
              href="/spotlight"
              style={{
                background: "transparent",
                color: "#5B2D8E",
                border: "1.5px solid #5B2D8E",
                borderRadius: 999,
                padding: "14px 30px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              See All Spotlights
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 6: Newsletter ── */}
      <section style={{ background: "#1A0A2E" }}>
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "74px 32px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 800,
              fontSize: 40,
              color: "#fff",
              margin: "0 0 14px",
            }}
          >
            Get Good News in Your Inbox
          </h2>
          <p
            style={{
              fontSize: 16.5,
              color: "#F8A5C8",
              margin: "0 0 30px",
            }}
          >
            Weekly positive stories from the CSRA delivered straight to you.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
