import { GitCompare } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const ComparisonTable = () => {
  return (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="tip-card">
        <div className="flex items-center gap-3 mb-4">
          <GitCompare className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-bold text-primary">Vergleich mit anderen Algorithmen</h2>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="text-foreground font-semibold">Algorithmus</TableHead>
                <TableHead className="text-foreground font-semibold">Bester</TableHead>
                <TableHead className="text-foreground font-semibold">Durchschnitt</TableHead>
                <TableHead className="text-foreground font-semibold">Schlimmster</TableHead>
                <TableHead className="text-foreground font-semibold">Stabil</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-border/30 bg-primary/10">
                <TableCell className="font-semibold text-primary">Insertion Sort</TableCell>
                <TableCell className="font-mono text-sm">O(n)</TableCell>
                <TableCell className="font-mono text-sm">O(n²)</TableCell>
                <TableCell className="font-mono text-sm">O(n²)</TableCell>
                <TableCell className="text-secondary">✓ Ja</TableCell>
              </TableRow>
              <TableRow className="border-border/30 hover:bg-muted/30">
                <TableCell className="font-medium">Bubble Sort</TableCell>
                <TableCell className="font-mono text-sm">O(n)</TableCell>
                <TableCell className="font-mono text-sm">O(n²)</TableCell>
                <TableCell className="font-mono text-sm">O(n²)</TableCell>
                <TableCell className="text-secondary">✓ Ja</TableCell>
              </TableRow>
              <TableRow className="border-border/30 hover:bg-muted/30">
                <TableCell className="font-medium">Merge Sort</TableCell>
                <TableCell className="font-mono text-sm">O(n log n)</TableCell>
                <TableCell className="font-mono text-sm">O(n log n)</TableCell>
                <TableCell className="font-mono text-sm">O(n log n)</TableCell>
                <TableCell className="text-secondary">✓ Ja</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <p className="mt-4 text-sm text-muted-foreground">
          <span className="text-primary font-semibold">Tipp:</span> Insertion Sort ist ideal für kleine 
          oder fast sortierte Listen, während Merge Sort für große Datenmengen effizienter ist.
        </p>
      </div>
    </div>
  );
};
