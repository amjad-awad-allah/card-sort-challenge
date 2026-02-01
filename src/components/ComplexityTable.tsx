import { Clock, HardDrive } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const ComplexityTable = () => {
  return (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="tip-card">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-bold text-primary">Zeit- und Speicherkomplexität</h2>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="text-foreground font-semibold">Fall</TableHead>
                <TableHead className="text-foreground font-semibold">Zeitkomplexität</TableHead>
                <TableHead className="text-foreground font-semibold">Beschreibung</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-border/30 hover:bg-secondary/10">
                <TableCell className="font-medium text-secondary">Bester Fall</TableCell>
                <TableCell className="font-mono text-secondary">O(n)</TableCell>
                <TableCell className="text-muted-foreground text-sm">Liste bereits sortiert</TableCell>
              </TableRow>
              <TableRow className="border-border/30 hover:bg-primary/10">
                <TableCell className="font-medium text-primary">Durchschnitt</TableCell>
                <TableCell className="font-mono text-primary">O(n²)</TableCell>
                <TableCell className="text-muted-foreground text-sm">Zufällige Reihenfolge</TableCell>
              </TableRow>
              <TableRow className="border-border/30 hover:bg-accent/10">
                <TableCell className="font-medium text-accent">Schlimmster Fall</TableCell>
                <TableCell className="font-mono text-accent">O(n²)</TableCell>
                <TableCell className="text-muted-foreground text-sm">Liste umgekehrt sortiert</TableCell>
              </TableRow>
              <TableRow className="border-border/30 hover:bg-muted/30">
                <TableCell className="font-medium flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  Speicher
                </TableCell>
                <TableCell className="font-mono">O(1)</TableCell>
                <TableCell className="text-muted-foreground text-sm">In-Place Sortierung</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
