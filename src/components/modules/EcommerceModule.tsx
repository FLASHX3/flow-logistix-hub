import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Package,
  Truck,
  Shield,
  Euro
} from "lucide-react";
import ecommerceImage from "@/assets/ecommerce-icon.jpg";

const products = [
  {
    id: "P001",
    name: "Moteur électrique 3kW",
    description: "Moteur industriel reconditionné, garantie 2 ans",
    price: 450,
    originalPrice: 650,
    category: "Moteurs",
    brand: "Siemens",
    condition: "Excellent",
    stock: 5,
    rating: 4.8,
    reviews: 23,
    shipping: "Gratuite",
    image: ecommerceImage,
    tags: ["Reconditionné", "Garantie", "Industriel"]
  },
  {
    id: "P002",
    name: "Pompe hydraulique 50L/min",
    description: "Pompe hydraulique haute performance, testée",
    price: 280,
    originalPrice: 420,
    category: "Hydraulique",
    brand: "Bosch",
    condition: "Très bon",
    stock: 12,
    rating: 4.6,
    reviews: 18,
    shipping: "5€",
    image: ecommerceImage,
    tags: ["Performance", "Testée"]
  },
  {
    id: "P003",
    name: "Réducteur vitesse 1:40",
    description: "Réducteur de vitesse industriel, révision complète",
    price: 320,
    originalPrice: 480,
    category: "Transmission",
    brand: "SEW",
    condition: "Excellent",
    stock: 3,
    rating: 4.9,
    reviews: 31,
    shipping: "Gratuite",
    image: ecommerceImage,
    tags: ["Révisé", "Industriel", "Rare"]
  },
  {
    id: "P004",
    name: "Capteur de pression IP67",
    description: "Capteur industriel étanche, certification IP67",
    price: 85,
    originalPrice: 130,
    category: "Capteurs",
    brand: "Endress+Hauser",
    condition: "Bon",
    stock: 25,
    rating: 4.4,
    reviews: 12,
    shipping: "3€",
    image: ecommerceImage,
    tags: ["Étanche", "Certifié"]
  },
  {
    id: "P005",
    name: "Variateur de fréquence 7.5kW",
    description: "Variateur de fréquence reconditionné, paramétrage inclus",
    price: 650,
    originalPrice: 950,
    category: "Électronique",
    brand: "ABB",
    condition: "Excellent",
    stock: 2,
    rating: 4.7,
    reviews: 15,
    shipping: "Gratuite",
    image: ecommerceImage,
    tags: ["Paramétrage", "Haute puissance"]
  },
  {
    id: "P006",
    name: "Vérin pneumatique Ø50",
    description: "Vérin pneumatique double effet, joints neufs",
    price: 120,
    originalPrice: 180,
    category: "Pneumatique",
    brand: "Festo",
    condition: "Très bon",
    stock: 8,
    rating: 4.5,
    reviews: 9,
    shipping: "4€",
    image: ecommerceImage,
    tags: ["Joints neufs", "Double effet"]
  }
];

const categories = [
  "Toutes catégories",
  "Moteurs",
  "Hydraulique", 
  "Transmission",
  "Capteurs",
  "Électronique",
  "Pneumatique"
];

const conditions = [
  "Toutes conditions",
  "Excellent",
  "Très bon",
  "Bon"
];

export function EcommerceModule() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes catégories");
  const [selectedCondition, setSelectedCondition] = useState("Toutes conditions");
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Toutes catégories" || product.category === selectedCategory;
    const matchesCondition = selectedCondition === "Toutes conditions" || product.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const toggleCart = (productId: string) => {
    setCart(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent": return "bg-success text-success-foreground";
      case "Très bon": return "bg-primary text-primary-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <div 
            className="w-16 h-16 rounded-xl bg-cover bg-center shadow-soft"
            style={{ backgroundImage: `url(${ecommerceImage})` }}
          />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Boutique E-commerce</h1>
            <p className="text-muted-foreground">Pièces industrielles reconditionnées certifiées</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="relative">
            <Heart className="w-4 h-4 mr-2" />
            Favoris
            {wishlist.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {wishlist.length}
              </Badge>
            )}
          </Button>
          
          <Button variant="default" className="relative">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Panier
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground">
                {cart.length}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 mb-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des pièces (nom, référence, description...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtres:</span>
            </div>
            
            <div className="flex flex-wrap gap-2 flex-1">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map(condition => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Checkbox id="freeShipping" />
                <label htmlFor="freeShipping" className="text-sm">Livraison gratuite</label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="inStock" />
                <label htmlFor="inStock" className="text-sm">En stock</label>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
        </p>
        
        <Select defaultValue="popularity">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Plus populaires</SelectItem>
            <SelectItem value="price-asc">Prix croissant</SelectItem>
            <SelectItem value="price-desc">Prix décroissant</SelectItem>
            <SelectItem value="rating">Mieux notés</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover-lift group">
            {/* Product Image */}
            <div className="relative h-48 overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url(${product.image})` }}
              />
              
              {/* Discount Badge */}
              {product.originalPrice > product.price && (
                <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                  -{calculateDiscount(product.originalPrice, product.price)}%
                </Badge>
              )}
              
              {/* Condition Badge */}
              <Badge className={`absolute top-2 right-2 ${getConditionColor(product.condition)}`}>
                {product.condition}
              </Badge>

              {/* Quick Actions */}
              <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  size="icon" 
                  variant="glass"
                  onClick={() => toggleWishlist(product.id)}
                  className={wishlist.includes(product.id) ? "text-red-400" : ""}
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="glass">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{product.brand}</span>
                </div>
                
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} avis)</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {product.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Price and Stock */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-foreground">
                      {product.price}€
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}€
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Package className="w-3 h-3" />
                    <span>{product.stock} en stock</span>
                    <Truck className="w-3 h-3 ml-2" />
                    <span>{product.shipping}</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <Button 
                className="w-full"
                variant={cart.includes(product.id) ? "success" : "default"}
                onClick={() => toggleCart(product.id)}
              >
                {cart.includes(product.id) ? (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Ajouté au panier
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Aucun produit trouvé</h3>
          <p className="text-muted-foreground mb-4">
            Essayez de modifier vos critères de recherche ou parcourez toutes les catégories.
          </p>
          <Button 
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("Toutes catégories");
              setSelectedCondition("Toutes conditions");
            }}
          >
            Réinitialiser les filtres
          </Button>
        </Card>
      )}
    </div>
  );
}