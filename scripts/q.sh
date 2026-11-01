#!/usr/bin/env bash
# Enveloppe silencieuse (règle de sobriété n° 2, 01/11/2026).
# Usage : scripts/q.sh <nom-du-journal> <commande> [arguments…]
# Écrit la sortie complète dans .logs/<nom>.log (gitignoré) et n'affiche que le code de sortie et les
# Q_TAIL dernières lignes (20 par défaut). Ne jamais faire `cat` d'un journal entier : grep ciblé ou tail.
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
mkdir -p "$ROOT/.logs"
log="$ROOT/.logs/$1.log"; shift
"$@" >"$log" 2>&1; rc=$?
echo "[q] exit $rc · journal .logs/$(basename "$log") ($(wc -l <"$log") lignes)"
tail -n "${Q_TAIL:-20}" "$log" | cut -c1-300
exit $rc
