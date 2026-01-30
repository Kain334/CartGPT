import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart3, 
  Users, 
  TrendingDown, 
  LogOut, 
  Calendar,
  Mail,
  Activity,
  Eye,
  Video,
  FileText,
  MessageSquare,
  MousePointer,
  UserPlus
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, LabelList, Cell } from "recharts";
import { format } from "date-fns";

type TimeFilter = "daily" | "7days" | "30days";

interface EventCount {
  event_name: string;
  count: number;
}

interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
}

const FUNNEL_COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--cta))", "hsl(var(--secondary))"];

const AdminAnalytics = () => {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("daily");
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [eventCounts, setEventCounts] = useState<EventCount[]>([]);
  const [dauCount, setDauCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
    }
  }, [isAuthenticated, timeFilter]);

  const getDateFilter = () => {
    const now = new Date();
    switch (timeFilter) {
      case "daily":
        return new Date(now.setHours(0, 0, 0, 0)).toISOString();
      case "7days":
        return new Date(now.setDate(now.getDate() - 7)).toISOString();
      case "30days":
        return new Date(now.setDate(now.getDate() - 30)).toISOString();
    }
  };

  const fetchAnalytics = async () => {
    setIsLoading(true);
    const dateFilter = getDateFilter();

    try {
      // Fetch waitlist count for today
      const { count: todayWaitlistCount } = await supabase
        .from("waitlist_signups")
        .select("*", { count: "exact", head: true })
        .gte("created_at", new Date(new Date().setHours(0, 0, 0, 0)).toISOString());
      
      setWaitlistCount(todayWaitlistCount || 0);

      // Fetch all waitlist entries
      const { data: waitlistData } = await supabase
        .from("waitlist_signups")
        .select("*")
        .gte("created_at", dateFilter)
        .order("created_at", { ascending: false });
      
      setWaitlistEntries(waitlistData || []);

      // Fetch event counts
      const { data: eventsData } = await supabase
        .from("user_events")
        .select("event_name")
        .gte("created_at", dateFilter);

      if (eventsData) {
        const counts = eventsData.reduce((acc: Record<string, number>, event) => {
          acc[event.event_name] = (acc[event.event_name] || 0) + 1;
          return acc;
        }, {});

        setEventCounts(
          Object.entries(counts).map(([event_name, count]) => ({
            event_name,
            count,
          }))
        );

        // Calculate DAU (unique guest_ids)
        const { data: uniqueGuests } = await supabase
          .from("user_events")
          .select("guest_id")
          .gte("created_at", dateFilter);

        const uniqueGuestIds = new Set(uniqueGuests?.map((e) => e.guest_id));
        setDauCount(uniqueGuestIds.size);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEventCount = (eventName: string) => {
    return eventCounts.find((e) => e.event_name === eventName)?.count || 0;
  };

  // Funnel A: Content Engagement
  const funnelAData = [
    { name: "Landing Page", value: getEventCount("landing page"), fill: FUNNEL_COLORS[0] },
    { name: "Video", value: getEventCount("video"), fill: FUNNEL_COLORS[1] },
    { name: "Explanation", value: getEventCount("explanation"), fill: FUNNEL_COLORS[2] },
    { name: "Reviews", value: getEventCount("reviews"), fill: FUNNEL_COLORS[3] },
  ];

  // Funnel B: Conversion Flow
  const funnelBData = [
    { name: "DAU", value: dauCount, fill: FUNNEL_COLORS[0] },
    { name: "Landing Page", value: getEventCount("landing page"), fill: FUNNEL_COLORS[1] },
    { name: "Button Click", value: getEventCount("button"), fill: FUNNEL_COLORS[2] },
    { name: "Waitlist", value: getEventCount("waiting list"), fill: FUNNEL_COLORS[3] },
  ];

  const calculateDropOff = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return Math.round(((previous - current) / previous) * 100);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  const getEventIcon = (eventName: string) => {
    switch (eventName) {
      case "landing page": return <Eye className="w-4 h-4" />;
      case "video": return <Video className="w-4 h-4" />;
      case "explanation": return <FileText className="w-4 h-4" />;
      case "reviews": return <MessageSquare className="w-4 h-4" />;
      case "button": return <MousePointer className="w-4 h-4" />;
      case "waiting list": return <UserPlus className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">CartGPT Analytics</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Time Filter */}
        <Tabs value={timeFilter} onValueChange={(v) => setTimeFilter(v as TimeFilter)}>
          <TabsList>
            <TabsTrigger value="daily" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Today
            </TabsTrigger>
            <TabsTrigger value="7days">Last 7 Days</TabsTrigger>
            <TabsTrigger value="30days">Last 30 Days</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today's Sign-ups
              </CardTitle>
              <Mail className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{waitlistCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                New waitlist entries today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Daily Active Users
              </CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dauCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Unique visitors in selected period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Events
              </CardTitle>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {eventCounts.reduce((sum, e) => sum + e.count, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                All tracked events
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Event Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Event Breakdown</CardTitle>
            <CardDescription>All tracked events in the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {["landing page", "video", "explanation", "reviews", "button", "waiting list"].map((eventName) => (
                <div key={eventName} className="p-4 rounded-lg bg-muted/50 text-center">
                  <div className="flex items-center justify-center mb-2 text-muted-foreground">
                    {getEventIcon(eventName)}
                  </div>
                  <div className="text-2xl font-bold">{getEventCount(eventName)}</div>
                  <div className="text-xs text-muted-foreground capitalize">{eventName}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Funnels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Funnel A: Content Engagement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                Content Engagement Funnel
              </CardTitle>
              <CardDescription>
                Landing Page → Video → Explanation → Reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelAData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {funnelAData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {funnelAData.slice(1).map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {funnelAData[index].name} → {item.name}
                    </span>
                    <span className="font-medium text-destructive">
                      -{calculateDropOff(item.value, funnelAData[index].value)}% drop-off
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Funnel B: Conversion Flow */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                Conversion Funnel
              </CardTitle>
              <CardDescription>
                DAU → Landing Page → Button Click → Waitlist
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelBData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {funnelBData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {funnelBData.slice(1).map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {funnelBData[index].name} → {item.name}
                    </span>
                    <span className="font-medium text-destructive">
                      -{calculateDropOff(item.value, funnelBData[index].value)}% drop-off
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Waitlist Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Waitlist Entries
            </CardTitle>
            <CardDescription>
              All email submissions in the selected period ({waitlistEntries.length} entries)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {waitlistEntries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No waitlist entries in this period
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Signed Up</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {waitlistEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.email}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(entry.created_at), "MMM d, yyyy 'at' h:mm a")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminAnalytics;
