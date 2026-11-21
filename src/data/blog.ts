/**
 * Blog — short technical writing that proves thinking. Two posts to
 * start, both about the salon system, both built only on verified
 * facts: the 64/64 test suite (~/workspace/salon, verified
 * 2026-10-15) and the filtered unique index in
 * Configurations.cs. Code snippets are quoted verbatim from the
 * salon codebase, not written for the post.
 *
 * The blog is NOT a nav item (nav stays exactly 5). It is linked
 * from the salon case-study page (further reading) and from the
 * footer.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "code"; text: string; lang: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  blocks: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "salon-64-tests",
    title: "How I tested the salon system to 64/64",
    date: "21 Nov 2026",
    excerpt:
      "64 xUnit tests, all passing. The number is not the point — what the tests cover is, and what they honestly do not.",
    readTime: "3 min read",
    blocks: [
      {
        type: "p",
        text: "The salon system has 64 xUnit tests, and all 64 pass. That number is not the point. What the tests cover is the point. A salon runs on rules that cannot break quietly: a chair cannot hold two customers, a bill cannot change after it is printed, a discount over 50% needs the owner. If a rule like that fails, somebody loses money or a customer. So the tests test the rules, not the buttons.",
      },
      { type: "h2", text: "What the 64 tests cover" },
      {
        type: "p",
        text: "The suite is split across 11 test classes, one per area of the system. AppointmentTests and CapacityTests cover bookings and the walk-in queue, including the rule that a requested employee is never silently changed. BillingTests and DiscountCalculatorTests cover price snapshots, payments and owner-only corrections. InventoryTests cover the ledger: every adjustment recorded with a reason, purchases increasing stock exactly once. ReportTests cover the cash-basis financial reports. MigrationTests and BackupTests cover the database itself — migrations apply cleanly, and backup and restore work with a safety backup taken first. SecurityTests cover users, roles and PBKDF2 password hashing, including first-run owner setup with no default password. CustomerServiceTests and ServiceCatalogTests cover the everyday create-and-edit flows the staff use all day.",
      },
      {
        type: "list",
        items: [
          "AppointmentTests — bookings and requested employees",
          "CapacityTests — stations, chairs and overlapping sessions",
          "BillingTests — bills, payments and corrections",
          "DiscountCalculatorTests — discounts and offers",
          "InventoryTests — stock ledger and purchases",
          "ReportTests — cash-basis financial reports",
          "MigrationTests — database migrations",
          "BackupTests — backup and restore",
          "SecurityTests — users, roles and password hashing",
          "CustomerServiceTests — customer records",
          "ServiceCatalogTests — services and prices",
        ],
      },
      { type: "h2", text: "The test that matters most" },
      {
        type: "p",
        text: "If I had to keep one test, it would be this one. It starts a session for one customer on Chair 1, then tries to start a second session for a different customer, with a different employee, on the same chair — and expects the system to refuse with a conflict:",
      },
      {
        type: "code",
        lang: "csharp",
        text: `[Fact]
public async Task ExclusiveStation_NoDoubleOccupancy()
{
    var (scope, seed) = await SeedAsync();
    using (scope)
    {
        var sessions = scope.Get<ISessionService>();
        var customers = scope.Get<ICustomerService>();
        var other = await customers.CreateAsync(new("Sara", "03007654321", null, null));

        await sessions.StartAsync(new StartSessionInput(seed.CustomerId,
            [new SessionLineInput(seed.ServiceId, null, seed.Employee1Id)],
            seed.Station1Id, null, null, null));

        // Same exclusive station → blocked even with a different employee/customer.
        await Assert.ThrowsAsync<ConflictException>(() => sessions.StartAsync(
            new StartSessionInput(other.Id,
                [new SessionLineInput(seed.ServiceId, null, seed.Employee2Id)],
                seed.Station1Id, null, null, null)));
    }
}`,
      },
      {
        type: "p",
        text: "That test is the salon's busiest rule in one method: two walk-ins, one chair, no double booking. It runs against the real service layer and the real database configuration, so it also proves the filtered unique index underneath it — that index gets its own post.",
      },
      { type: "h2", text: "What the tests do not cover" },
      {
        type: "p",
        text: "Two things, stated plainly. The WPF user interface was never tested by clicking through it on Windows — there was no Windows machine available in the workspace where the system was built. And no installer was produced, so the system is delivered as a built application, not a setup package. Both are written on the salon case-study page, in the verification note, because a test count means nothing if you hide what was not tested.",
      },
      { type: "h2", text: "The rule I kept" },
      {
        type: "p",
        text: "One rule, applied to every test: test the business rule, not the framework. A test that checks EF Core can save a row proves nothing. A test that checks a second active session cannot be created on an exclusive chair proves the salon cannot double-book. That is why the suite is 64 tests and not 200 — every test is a rule the salon depends on.",
      },
    ],
  },
  {
    slug: "filtered-unique-index-chair",
    title: "One filtered unique index that keeps one session per salon chair",
    date: "21 Nov 2026",
    excerpt:
      "Two walk-ins, one chair, no double booking. The rule lives in the database, not in a service method two requests can race past.",
    readTime: "2 min read",
    blocks: [
      {
        type: "p",
        text: "A salon chair can hold one customer at a time. That sounds obvious until two walk-ins arrive together and both get seated in the same chair. The salon system prevents that in the database itself, with one filtered unique index — not in the UI, not in a service method that two requests can race past, but in the index.",
      },
      {
        type: "code",
        lang: "csharp",
        text: `// INVARIANT: an exclusive station hosts at most one active session.
// Enforced at the database level — no race window.
b.HasIndex(s => s.StationId).IsUnique()
    .HasFilter("\\"StationId\\" IS NOT NULL AND \\"Status\\" = 0 AND \\"StationIsExclusive\\" = 1");`,
      },
      { type: "h2", text: "Why filtered, not just unique" },
      {
        type: "p",
        text: "A plain unique index on StationId would allow one session per chair ever — the first customer would block the chair forever, because finished sessions would still count. The filter is the whole trick. It only applies to rows where a station is assigned, the session is active (Status = 0), and the station is exclusive (StationIsExclusive = 1). A finished session stops counting the moment it ends. A non-exclusive station is not constrained at all — the rule only guards chairs that cannot be shared.",
      },
      { type: "h2", text: "Why the database, not the application" },
      {
        type: "p",
        text: "The application also checks availability before creating a session. But two requests can both check, both see a free chair, and both write — the classic race. The index has no race: the database refuses the second write. Serializable transactions re-check availability inside the transaction as a second layer, but the index is the guarantee. If the index were removed, the rule could break under load. If the application check were removed, the user would get a database error instead of a friendly message — worse experience, same guarantee.",
      },
      { type: "h2", text: "How I know it works" },
      {
        type: "p",
        text: "There is a test for exactly this: ExclusiveStation_NoDoubleOccupancy in CapacityTests starts a session for one customer on Chair 1, then tries a second session for a different customer with a different employee on the same chair, and expects a conflict. The test runs against the real service layer and the real database configuration, so it exercises the index, not a mock of it. The full story of the test suite is in the companion post, How I tested the salon system to 64/64.",
      },
      { type: "h2", text: "The general rule" },
      {
        type: "p",
        text: "Whenever a rule must hold under concurrency, put it where concurrency is decided — in the database. Application checks are for friendly messages. Indexes and constraints are for guarantees. The salon has one chair rule; the same shape works anywhere two people can claim the same thing at the same time — a seat, a room, a time slot.",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
