import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Truck, Star, Filter, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Machinery {
  id: string;
  name: string;
  type: string;
  owner: string;
  location: string;
  pricePerDay: number;
  rating: number;
  available: boolean;
  image: string;
  description: string;
  specs: string[];
}

const machineryData: Machinery[] = [
  {
    id: '1',
    name: 'John Deere 5050D',
    type: 'tractor',
    owner: 'राम शर्मा',
    location: 'Pune, Maharashtra',
    pricePerDay: 1200,
    rating: 4.8,
    available: true,
    image: '/api/placeholder/300/200',
    description: '50 HP tractor perfect for medium farms',
    specs: ['50 HP', '4WD', 'Power Steering', 'Front Loader']
  },
  {
    id: '2',
    name: 'Mahindra 575 DI',
    type: 'tractor',
    owner: 'Priya Nair',
    location: 'Kochi, Kerala',
    pricePerDay: 1000,
    rating: 4.6,
    available: true,
    image: '/api/placeholder/300/200',
    description: 'Reliable tractor for paddy fields',
    specs: ['47 HP', '2WD', 'Hydraulic Steering', 'PTO']
  },
  {
    id: '3',
    name: 'Combine Harvester',
    type: 'harvester',
    owner: 'Harpreet Singh',
    location: 'Ludhiana, Punjab',
    pricePerDay: 2500,
    rating: 4.9,
    available: false,
    image: '/api/placeholder/300/200',
    description: 'Modern combine harvester for wheat',
    specs: ['6 feet cutting width', 'Grain tank', 'Threshing unit']
  },
  {
    id: '4',
    name: 'Rotavator',
    type: 'equipment',
    owner: 'अमित पटेल',
    location: 'Nashik, Maharashtra',
    pricePerDay: 400,
    rating: 4.5,
    available: true,
    image: '/api/placeholder/300/200',
    description: 'Soil preparation equipment',
    specs: ['7 feet width', 'Heavy duty blades', 'Adjustable depth']
  }
];

export default function MachineryMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const { toast } = useToast();

  const filteredMachinery = machineryData.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || machine.type === filterType;
    const matchesLocation = filterLocation === 'all' || machine.location.includes(filterLocation);
    
    return matchesSearch && matchesType && matchesLocation;
  });

  const handleBookMachinery = (machinery: Machinery) => {
    if (!machinery.available) {
      toast({
        title: "Not Available",
        description: "This machinery is currently not available for booking.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Booking Request Sent",
      description: `Your booking request for ${machinery.name} has been sent to ${machinery.owner}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            🚜 Machinery Marketplace
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Rent agricultural machinery from fellow farmers in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search machinery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="tractor">Tractors</SelectItem>
                <SelectItem value="harvester">Harvesters</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger>
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="Kerala">Kerala</SelectItem>
                <SelectItem value="Punjab">Punjab</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Select Dates
            </Button>
          </div>
        </div>

        {/* Machinery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMachinery.map((machinery) => (
            <Card key={machinery.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={machinery.image} 
                  alt={machinery.name}
                  className="w-full h-48 object-cover"
                />
                <Badge 
                  variant={machinery.available ? "default" : "secondary"}
                  className="absolute top-2 right-2"
                >
                  {machinery.available ? "Available" : "Booked"}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {machinery.name}
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                    <span className="text-sm">{machinery.rating}</span>
                  </div>
                </CardTitle>
                <CardDescription>{machinery.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {machinery.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Truck className="h-4 w-4 mr-2" />
                    Owner: {machinery.owner}
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {machinery.specs.map((spec, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between">
                <div className="text-xl font-bold text-primary">
                  ₹{machinery.pricePerDay}/day
                </div>
                <Button 
                  onClick={() => handleBookMachinery(machinery)}
                  disabled={!machinery.available}
                  variant={machinery.available ? "default" : "secondary"}
                >
                  {machinery.available ? "Book Now" : "Not Available"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredMachinery.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No machinery found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}