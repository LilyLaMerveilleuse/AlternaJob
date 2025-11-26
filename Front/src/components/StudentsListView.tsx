import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Search, MapPin, GraduationCap, RotateCcw, User } from 'lucide-react';
import { mockStudents } from '../data/mockData';
import { StudentProfile } from '../types';
import { StudentDetailModal } from './StudentDetailModal';

export function StudentsListView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [fieldFilter, setFieldFilter] = useState<string>('all');
  const [lookingForFilter, setLookingForFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extraire les valeurs uniques pour les filtres
  const levels = useMemo(() => {
    const lvls = [...new Set(mockStudents.map((s) => s.level))];
    return lvls.sort();
  }, []);

  const fields = useMemo(() => {
    const flds = [...new Set(mockStudents.map((s) => s.field))];
    return flds.sort();
  }, []);

  const locations = useMemo(() => {
    const locs = [...new Set(mockStudents.map((s) => s.location))];
    return locs.sort();
  }, []);

  // Filtrage des étudiants
  const filteredStudents = useMemo(() => {
    return mockStudents.filter((student) => {
      // Filtre recherche texte
      const matchesSearch =
        searchTerm === '' ||
        `${student.firstName} ${student.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        student.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Filtre niveau
      const matchesLevel = levelFilter === 'all' || student.level === levelFilter;

      // Filtre domaine
      const matchesField = fieldFilter === 'all' || student.field === fieldFilter;

      // Filtre recherche
      const matchesLookingFor =
        lookingForFilter === 'all' ||
        student.lookingFor === lookingForFilter ||
        student.lookingFor === 'both';

      // Filtre localisation
      const matchesLocation =
        locationFilter === 'all' || student.location === locationFilter;

      return (
        matchesSearch &&
        matchesLevel &&
        matchesField &&
        matchesLookingFor &&
        matchesLocation
      );
    });
  }, [searchTerm, levelFilter, fieldFilter, lookingForFilter, locationFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setLevelFilter('all');
    setFieldFilter('all');
    setLookingForFilter('all');
    setLocationFilter('all');
  };

  const handleRowClick = (student: StudentProfile) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const getLookingForLabel = (lookingFor: string) => {
    switch (lookingFor) {
      case 'alternance':
        return 'Alternance';
      case 'stage':
        return 'Stage';
      case 'both':
        return 'Les deux';
      default:
        return lookingFor;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Rechercher un étudiant
        </h1>
        <p className="text-gray-600">
          Trouvez le talent idéal parmi {mockStudents.length} profils disponibles
        </p>
      </motion.div>

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Recherche texte */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom, école, compétences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Disponibilité */}
            <Select value={lookingForFilter} onValueChange={setLookingForFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type recherché" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="alternance">Alternance</SelectItem>
                <SelectItem value="stage">Stage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Niveau */}
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Niveau d'études" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Domaine */}
            <Select value={fieldFilter} onValueChange={setFieldFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Domaine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les domaines</SelectItem>
                {fields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Localisation */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Localisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les villes</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Réinitialiser */}
            <Button
              variant="outline"
              onClick={resetFilters}
              className="border-gray-300"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Réinitialiser
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Résultats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white/70 backdrop-blur-md border-white/20 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredStudents.length} profil{filteredStudents.length > 1 ? 's' : ''}{' '}
              trouvé{filteredStudents.length > 1 ? 's' : ''}
            </p>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="p-12 text-center">
              <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Aucun profil trouvé</h3>
              <p className="text-gray-600 mb-4">
                Essayez de modifier vos critères de recherche
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[250px]">Étudiant</TableHead>
                  <TableHead>École</TableHead>
                  <TableHead>Niveau</TableHead>
                  <TableHead>Domaine</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Recherche</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow
                    key={student.id}
                    onClick={() => handleRowClick(student)}
                    className="cursor-pointer hover:bg-purple-50/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <span>
                          {student.firstName} {student.lastName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4 text-gray-400" />
                        {student.school}
                      </div>
                    </TableCell>
                    <TableCell>{student.level}</TableCell>
                    <TableCell>{student.field}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {student.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          student.lookingFor === 'alternance'
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                            : student.lookingFor === 'stage'
                            ? 'bg-purple-100 text-purple-700 hover:bg-purple-100'
                            : 'bg-green-100 text-green-700 hover:bg-green-100'
                        }
                      >
                        {getLookingForLabel(student.lookingFor)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </motion.div>

      {/* Modal détails */}
      <StudentDetailModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
